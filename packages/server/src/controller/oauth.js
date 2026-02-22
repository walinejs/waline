const jwt = require('jsonwebtoken');

module.exports = class extends think.Controller {
  constructor(ctx) {
    super(ctx);
    this.modelInstance = this.getModel('Users');
  }

  async indexAction() {
    const { code, state, type, redirect } = this.get();
    const { oauthUrl } = this.config();

    /**
     * ============================================================
     * 1️⃣ INIT PHASE
     * ============================================================
     */
    if (!code) {
      const { serverURL } = this.ctx;
      let loginToken = null;

      if (state && state.split('.').length === 3) {
        loginToken = state;
      } else if (this.ctx.state.token) {
        loginToken = this.ctx.state.token;
      }

      const redirectUrl = think.buildUrl(`${serverURL}/api/oauth`, { redirect, type });

      const oauthStateObject = {
        t: loginToken,
        s: Date.now()
      };

      const oauthState = Buffer.from(JSON.stringify(oauthStateObject)).toString("base64")
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '');

      const finalUrl = think.buildUrl(`${oauthUrl}/${type}`, {
        redirect: redirectUrl,
        state: oauthState,
      });

      return this.redirect(finalUrl);
    }

    /**
     * ============================================================
     * 2️⃣ CALLBACK PHASE
     * ============================================================
     */
    let current = null;
    let extractedToken = null;

    if (state) {
      try {
        let base64 = state.replace(/-/g, '+').replace(/_/g, '/');
        while (base64.length % 4) base64 += '=';

        const decodedString = Buffer.from(base64, "base64").toString();
        let payload = JSON.parse(decodedString);

        if (payload.state && typeof payload.state === 'string') { // 如果发现 payload 里面还有一个 state，说明是 Twitter 的嵌套格式，递归再解一层，从而拿到了藏在里面的原始 token
          let innerBase64 = payload.state.replace(/-/g, '+').replace(/_/g, '/');
          while (innerBase64.length % 4) innerBase64 += '=';
          const innerDecoded = Buffer.from(innerBase64, "base64").toString();
          payload = JSON.parse(innerDecoded);
        }

        extractedToken = payload.t || payload.token;

        if (extractedToken) {
          this.ctx.state.token = extractedToken;
          const userId = jwt.verify(extractedToken, this.config("jwtKey"));
          const users = await this.modelInstance.select({ objectId: userId });
          if (!think.isEmpty(users)) {
            current = users[0];
          }
        }
      } catch (e) {
        console.error("State decoding error:", e);
      }
    }

    this.ctx.state.userInfo = current;

    /**
     * ============================================================
     * 3️⃣ 获取 OAuth 用户信息
     * ============================================================
     */
    const callbackUrl = think.buildUrl(`${oauthUrl}/${type}`, { code, state });

    let user = null;
    try {
      const resp = await fetch(callbackUrl, {
        method: "GET",
        headers: { "User-Agent": "@waline", Accept: "application/json" },
      });
      user = await resp.json();
    } catch (err) {
      return this.fail("oauth_fetch_failed");
    }

    if (!user || !user.id) return this.fail("invalid_oauth_user");

    const socialId = String(user.id);
    const userBySocial = await this.modelInstance.select({ [type]: socialId });

    /**
     * ============================================================
     * 4️⃣ 冲突检查 (409) - 修改后的跳转逻辑
     * ============================================================
     */
    if (!think.isEmpty(userBySocial)) {
      const existing = userBySocial[0];

      if (current && existing.objectId === current.objectId) {
        return this.redirect("/ui/profile");
      }

      if (!current) {
        const token = jwt.sign(existing.objectId, this.config("jwtKey"));
        if (redirect) {
          return this.redirect(redirect + (redirect.includes("?") ? "&" : "?") + "token=" + token);
        }
        return this.success({ token });
      }

      // 已登录但账号已被他人绑定的情况
      const errorMessage = `This ${type} account is already bound by another user.\n\n该${type}账号已绑定了其它账号。\n如果这是您的账号，请先登录原绑定账号并解绑后再尝试绑定。`;
      console.log(`Conflict: ${errorMessage}`);
      
      // 直接跳转回 profile 页面并携带错误信息
      return this.redirect(`/ui/profile?error=${encodeURIComponent(errorMessage)}`);
    }

    /**
     * ============================================================
     * 5️⃣ 绑定新账号
     * ============================================================
     */
    if (current) {
      await this.modelInstance.update({ [type]: socialId }, { objectId: current.objectId });
      return this.redirect("/ui/profile");
    }

    const count = await this.modelInstance.count();
    const data = {
      display_name: user.name,
      email: user.email,
      url: user.url,
      avatar: user.avatar,
      [type]: socialId,
      password: this.hashPassword(Math.random().toString()),
      type: think.isEmpty(count) ? "administrator" : "guest",
    };

    const created = await this.modelInstance.add(data);
    const token = jwt.sign(created.objectId, this.config("jwtKey"));

    if (redirect) {
      return this.redirect(redirect + (redirect.includes("?") ? "&" : "?") + "token=" + token);
    }
    return this.success({ token });
  }
};
