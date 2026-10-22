const SITE_CONFIG_ENV = {
  secureDomains: 'SECURE_DOMAINS',
  forceLogin: 'LOGIN',
  audit: 'COMMENT_AUDIT',
  forbiddenWords: 'FORBIDDEN_WORDS',
  levels: 'LEVELS',
  disallowIPList: 'DISALLOW_IP_LIST',
  ipQps: 'IPQPS',
  likeIncMax: 'LIKE_INC_MAX',
  avatarProxy: 'AVATAR_PROXY',
  mailSubject: 'MAIL_SUBJECT',
  mailTemplate: 'MAIL_TEMPLATE',
  mailSubjectAdmin: 'MAIL_SUBJECT_ADMIN',
  mailTemplateAdmin: 'MAIL_TEMPLATE_ADMIN',
  QQTemplate: 'QQ_TEMPLATE',
  TGTemplate: 'TG_TEMPLATE',
  WXTemplate: 'WX_TEMPLATE',
  SCTemplate: 'SC_TEMPLATE',
  DiscordTemplate: 'DISCORD_TEMPLATE',
  LarkTemplate: 'LARK_TEMPLATE',
};

const listValue = (value) => (value ? value.split(/\s*,\s*/u).filter(Boolean) : undefined);
const boolValue = (value) => value && !['0', 'false'].includes(value.toLowerCase());

module.exports = class UpgradeService extends think.Service {
  async status(controller) {
    try {
      const sites = await controller.getModel('Site').select({});
      const missingComments = sites.length
        ? await controller.getModel('Comment').count({ site_id: undefined })
        : 0;
      const missingCounters = sites.length
        ? await controller.getModel('Counter').count({ site_id: undefined })
        : 0;
      return {
        required: !sites.length || Boolean(missingComments) || Boolean(missingCounters),
        version: sites.length ? 2 : 1,
        missingComments,
        missingCounters,
      };
    } catch {
      return { required: true, version: 1, missingComments: null, missingCounters: null };
    }
  }

  siteConfig() {
    const config = {};
    for (const [key, envName] of Object.entries(SITE_CONFIG_ENV)) {
      const value = process.env[envName];
      if (value == null || value === '') continue;
      config[key] = value;
    }
    config.secureDomains = listValue(process.env.SECURE_DOMAINS);
    config.forbiddenWords = listValue(process.env.FORBIDDEN_WORDS);
    config.levels = listValue(process.env.LEVELS)?.map(Number);
    config.disallowIPList = listValue(process.env.DISALLOW_IP_LIST);
    config.forceLogin = process.env.LOGIN === 'force';
    config.audit = boolValue(process.env.COMMENT_AUDIT);
    config.ipQps = Number(process.env.IPQPS || 60);
    config.likeIncMax = Number(process.env.LIKE_INC_MAX || 1);
    return Object.fromEntries(Object.entries(config).filter(([, value]) => value !== undefined));
  }

  async ensureSqlSchema(controller) {
    const storageName = controller.config('storage');
    if (!['mysql', 'tidb', 'postgresql', 'sqlite'].includes(storageName)) return;
    const storage = controller.getModel('Comment');
    const commentTable = storage.model('Comment').tableName;
    const counterTable = storage.model('Counter').tableName;
    const siteTable = storage.model('Site').tableName;
    const siteAdminTable = storage.model('SiteAdmin').tableName;
    const isPg = storageName === 'postgresql';
    const isSqlite = storageName === 'sqlite';
    const id = isPg
      ? 'SERIAL PRIMARY KEY'
      : isSqlite
        ? 'INTEGER PRIMARY KEY AUTOINCREMENT'
        : 'INTEGER PRIMARY KEY AUTO_INCREMENT';
    const bool = isPg ? 'BOOLEAN' : 'INTEGER';
    const falseValue = isPg ? 'false' : '0';
    const timestamp = isPg
      ? 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP'
      : isSqlite
        ? 'DATETIME DEFAULT CURRENT_TIMESTAMP'
        : 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP';
    const statements = [
      `ALTER TABLE ${commentTable} ADD COLUMN site_id VARCHAR(64)`,
      `ALTER TABLE ${counterTable} ADD COLUMN site_id VARCHAR(64)`,
      `CREATE TABLE ${siteTable} (id ${id}, name VARCHAR(255) NOT NULL, url VARCHAR(255) NOT NULL, status VARCHAR(20) NOT NULL DEFAULT 'active', ${isPg || isSqlite ? '"default"' : '`default`'} ${bool} NOT NULL DEFAULT ${falseValue}, config TEXT, createdAt ${timestamp}, updatedAt ${timestamp})`,
      `CREATE TABLE ${siteAdminTable} (id ${id}, site_id VARCHAR(64) NOT NULL, user_id VARCHAR(64) NOT NULL, createdAt ${timestamp}, updatedAt ${timestamp}, UNIQUE(site_id, user_id))`,
      `CREATE INDEX idx_comment_site_url ON ${commentTable} (site_id, url)`,
      `CREATE INDEX idx_counter_site_url ON ${counterTable} (site_id, url)`,
      ...(isPg
        ? [
            `ALTER TABLE ${siteTable} DROP COLUMN IF EXISTS siteid`,
            `ALTER TABLE ${siteTable} RENAME COLUMN isdefault TO "default"`,
          ]
        : []),
    ];
    for (const statement of statements) {
      try {
        await storage.model('Comment').query(statement);
      } catch (err) {
        const message = String(err.message || err).toLowerCase();
        if (!/(?<knownSchemaError>duplicate|exist|already|重复)/u.test(message)) throw err;
      }
    }
  }

  async run(controller) {
    await this.ensureSqlSchema(controller);
    const Site = controller.getModel('Site');
    const Comment = controller.getModel('Comment');
    const Counter = controller.getModel('Counter');
    const sites = await Site.select({});
    let site = sites.find(({ default: isDefault }) => [true, 1, '1', 'true'].includes(isDefault));
    if (!site) {
      site = await Site.add({
        name: process.env.SITE_NAME || 'Waline',
        url: process.env.SITE_URL || '',
        status: 'active',
        default: true,
        config: JSON.stringify(this.siteConfig()),
      });
    }
    await Comment.update({ site_id: site.objectId }, { site_id: undefined });
    await Counter.update({ site_id: site.objectId }, { site_id: undefined });
    const [missingComments, missingCounters] = await Promise.all([
      Comment.count({ site_id: undefined }),
      Counter.count({ site_id: undefined }),
    ]);
    if (missingComments || missingCounters) throw new Error('Some records still have no site');
    return { version: 2, siteId: site.objectId, migrated: true };
  }
};
