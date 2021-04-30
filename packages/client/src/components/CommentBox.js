import React, {
  useCallback,
  useContext,
  useReducer,
  useRef,
  useState,
} from 'react';
import autosize from 'autosize';
import cls from 'classnames';
import { ConfigContext } from '../context';
import { CancelReplyIcon, EmojiIcon, MarkdownIcon, PreviewIcon } from './Icons';
import {
  getMarkdownParser,
  getWordNumber,
  parseEmoji,
  postComment,
} from '../utils';

const CACHE_KEY = 'ValineCache';
const META = ['nick', 'mail', 'link'];
const store = {
  getItem(key) {
    let s = localStorage.getItem(CACHE_KEY);
    if (!s) {
      return;
    }

    try {
      s = JSON.parse(s);
      return s[key];
    } catch (e) {
      return;
    }
  },
  setItem(comment) {
    localStorage.setItem(CACHE_KEY, JSON.stringify(comment));
  },
};

function _insertAtCaret(field, val) {
  if (document.selection) {
    //For browsers like Internet Explorer
    field.focus();
    let sel = document.selection.createRange();
    sel.text = val;
    field.focus();
  } else if (field.selectionStart || field.selectionStart === 0) {
    //For browsers like Firefox and Webkit based
    let startPos = field.selectionStart;
    let endPos = field.selectionEnd;
    let scrollTop = field.scrollTop;
    field.value =
      field.value.substring(0, startPos) +
      val +
      field.value.substring(endPos, field.value.length);
    field.focus();
    field.selectionStart = startPos + val.length;
    field.selectionEnd = startPos + val.length;
    field.scrollTop = scrollTop;
  } else {
    field.focus();
    field.value += val;
  }
}

function onPasteFactory(
  editorRef,
  uploadImage = new Function(),
  insertAtCaret,
  onChange
) {
  return function (e) {
    const field = editorRef.current;
    const clipboardData =
      'clipboardData' in e
        ? e.clipboardData
        : (e.originalEvent && e.originalEvent.clipboardData) ||
          window.clipboardData;
    const files = [];
    const items = clipboardData && clipboardData.items;
    if (items && items.length) {
      // 检索剪切板items
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
          files.push(items[i].getAsFile());
          break;
        }
      }
    }
    if (files.length) {
      files.forEach((file) => {
        const uploadText = `![Uploading ${file['name']}]()`;
        insertAtCaret(field, uploadText);
        return Promise.resolve()
          .then(() => uploadImage(file))
          .then((ret) => {
            field.value = field.value.replace(
              uploadText,
              `\r\n![${file.name}](${ret.data || ret})`
            );
            onChange({ target: field });
          });
      });
    }
  };
}

export default function ({
  placeholder,
  meta,
  highlight,
  path,
  requiredFields,
  replyId,
  replyUser,
  rootId,
  serverURL,
  onCancelReply,
  onSubmit,
}) {
  const inputsRef = {
    nick: useRef(null),
    mail: useRef(null),
    link: useRef(null),
  };
  const editorRef = useRef(null);
  const [showEmoji, toggleEmoji] = useState(false);
  const [showPreview, togglePreview] = useState(false);
  const [previewText, setPreviewText] = useState('');
  const [comment, dispatch] = useReducer(
    (state, action) => ({ ...state, ...action }),
    {
      comment: '',
      nick: store.getItem('nick') || '',
      mail: store.getItem('mail') || '',
      link: store.getItem('link') || '',
      ua: navigator.userAgent,
      url: path,
    }
  );
  const [submitting, setSubmitting] = useState(false);
  const ctx = useContext(ConfigContext);

  const metaFields = meta.filter((kind) => META.indexOf(kind) > -1);

  const parser = getMarkdownParser(highlight, ctx);

  const onChange = useCallback((e) => {
    const comment = e.target.value;
    dispatch({ comment });
    const preview = parser(comment);

    setPreviewText(preview);

    if (comment) autosize(e.target);
    else autosize.destroy(e.target);
  }, []);

  const insertAtCaret = (field, val) => {
    _insertAtCaret(field, val);
    onChange({ target: field });
  };

  const onKeyDown = useCallback((e) => {
    const keyCode = e.keyCode || e.which || e.charCode;
    const ctrlKey = e.ctrlKey || e.metaKey;
    // Shortcut key
    ctrlKey && keyCode === 13 && submitComment();

    // tab key
    if (keyCode === 9) {
      e.preventDefault();
      insertAtCaret(e.target, '    ');
    }
  }, []);

  const onPaste = useCallback(
    onPasteFactory(editorRef, ctx.uploadImage, insertAtCaret, onChange),
    []
  );

  const submitComment = useCallback(() => {
    const isLogin = ctx.userInfo.token;
    const { wordLimit } = ctx;

    if (!isLogin) {
      if (requiredFields.indexOf('nick') > -1 && comment.nick.length < 2) {
        inputsRef.nick.current.focus();
        return;
      }
      if (
        requiredFields.indexOf('mail') > -1 &&
        (comment.mail.length < 6 ||
          comment.mail.indexOf('@') < 1 ||
          comment.mail.indexOf('.') < 3)
      ) {
        inputsRef.mail.current.focus();
        return;
      }
      if (comment.comment === '') {
        editorRef.current.focus();
        return;
      }
      comment.nick = comment.nick || 'Anonymous';
    } else {
      comment.nick = ctx.userInfo.display_name;
      comment.mail = ctx.userInfo.email;
      comment.link = ctx.userInfo.url;
    }

    if (wordLimit) {
      const wordCount = getWordNumber(comment.comment);

      if (wordCount < wordLimit[0] || wordCount > wordLimit[1]) {
        return alert(
          ctx.locale.word
            .replace('$0', wordLimit[0])
            .replace('$1', wordLimit[1])
            .replace('$2', wordCount)
        );
      }
    }

    comment.comment = parseEmoji(comment.comment, ctx.emojiMaps, ctx.emojiCDN);
    if (replyId && rootId) {
      comment.pid = replyId;
      comment.rid = rootId;
      comment.at = replyUser;
    }

    setSubmitting(true);
    postComment({ serverURL, token: ctx.userInfo.token, comment }).then(
      (resp) => {
        setSubmitting(false);
        store.setItem({
          nick: comment.nick,
          link: comment.link,
          mail: comment.mail,
        });

        if (resp.errmsg) {
          return alert(resp.errmsg);
        }
        onSubmit(resp.data);
        editorRef.current.value = '';
        setPreviewText('');
        if (replyId) {
          onCancelReply();
        }
      },
      () => setSubmitting(false)
    );
  }, [comment]);

  const onLogin = useCallback((e) => {
    e.preventDefault();
    const width = 450;
    const height = 450;
    const left = (window.innerWidth - width) / 2;
    const top = (window.innerHeight - height) / 2;
    const handler = window.open(
      serverURL + '/ui/login?lng=' + encodeURIComponent(ctx.lang),
      '_blank',
      `width=${width},height=${height},left=${left},top=${top},scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no`
    );
    handler.postMessage({ type: 'TOKEN', data: null }, '*');
    window.addEventListener('message', ({ data }) => {
      if (!data || data.type !== 'userInfo') {
        return;
      }
      if (data.data.token) {
        handler.close();
        ctx.setUserInfo(data.data);
        (data.data.remember ? localStorage : sessionStorage).setItem(
          'WALINE_USER',
          JSON.stringify(data.data)
        );
      }
    });
  }, []);

  const onLogout = useCallback(() => {
    ctx.setUserInfo({});
    localStorage.setItem('WALINE_USER', '');
    sessionStorage.setItem('WALINE_USER', '');
  }, []);

  const onProfile = useCallback((e) => {
    e.preventDefault();

    const width = 800;
    const height = 800;
    const left = (window.innerWidth - width) / 2;
    const top = (window.innerHeight - height) / 2;
    const handler = window.open(
      serverURL + '/ui/profile?lng=' + encodeURIComponent(ctx.lang),
      '_blank',
      `width=${width},height=${height},left=${left},top=${top},scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no`
    );
    handler.postMessage({ type: 'TOKEN', data: ctx.userInfo.token }, '*');
    window.addEventListener('message', ({ data }) => {
      if (!data || data.type !== 'profile') {
        return;
      }

      const userInfo = { ...ctx.userInfo, ...data };
      ctx.setUserInfo(userInfo);
      [localStorage, sessionStorage]
        .filter((store) => store.getItem('WALINE_USER'))
        .forEach((store) =>
          store.setItem('WALINE_USER', JSON.stringify(userInfo))
        );
    });
  });

  return (
    <div className="vpanel">
      <div className="vwrap">
        {replyId ? (
          <p
            className="cancel-reply text-right"
            title={ctx.locale.cancelReply}
            onClick={onCancelReply}
          >
            <CancelReplyIcon />
          </p>
        ) : null}
        {ctx.anonymous !== true ? (
          <div className="vleft vlogin">
            {!ctx.userInfo.token ? (
              <a className="vlogin-btn" onClick={onLogin}>
                {ctx.locale.login}
              </a>
            ) : (
              <div className="vlogin-info">
                <div className="vlogin-avatar">
                  <img
                    src={
                      ctx.userInfo.avatar ||
                      ctx.gravatarSetting.cdn +
                        ctx.userInfo.mailMd5 +
                        ctx.gravatarSetting.params
                    }
                    alt=""
                    className="vimg"
                  />
                  <div
                    title={ctx.locale.logout}
                    className="vlogin-logout-btn"
                    onClick={onLogout}
                  >
                    <svg
                      className="vicon"
                      viewBox="0 0 1024 1024"
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                    >
                      <path d="m568.569 512 170.267-170.267c15.556-15.556 15.556-41.012 0-56.569s-41.012-15.556-56.569 0L512 455.431 341.733 285.165c-15.556-15.556-41.012-15.556-56.569 0s-15.556 41.012 0 56.569L455.431 512 285.165 682.267c-15.556 15.556-15.556 41.012 0 56.569 15.556 15.556 41.012 15.556 56.569 0L512 568.569l170.267 170.267c15.556 15.556 41.012 15.556 56.569 0 15.556-15.556 15.556-41.012 0-56.569L568.569 512z" />
                    </svg>
                  </div>
                </div>
                <a href="#" className="vlogin-nick" onClick={onProfile}>
                  {ctx.userInfo.display_name}
                </a>
              </div>
            )}
          </div>
        ) : null}
        <div className="vright">
          {!ctx.userInfo.token && ctx.anonymous !== false ? (
            <div className={`vheader item${metaFields.length}`}>
              {metaFields.map((kind) => (
                <input
                  key={kind}
                  name={kind}
                  ref={inputsRef[kind]}
                  defaultValue={comment[kind]}
                  className={`v${kind} vinput`}
                  placeholder={ctx.locale[kind]}
                  type={kind === 'mail' ? 'email' : 'text'}
                  onChange={(e) => dispatch({ [kind]: e.target.value })}
                />
              ))}
            </div>
          ) : null}
          <div className="vedit">
            <textarea
              id="vedit"
              ref={editorRef}
              className="veditor vinput"
              placeholder={replyUser ? `@${replyUser}` : placeholder}
              onKeyDown={onKeyDown}
              onPaste={onPaste}
              onChange={onChange}
            ></textarea>
            <div className="vrow">
              <div className="vcol vcol-60 status-bar"></div>
              <div className="vcol vcol-40 vctrl text-right">
                <span
                  title={ctx.locale.emoji}
                  className={cls('vicon vemoji-btn', { actived: showEmoji })}
                  onClick={() =>
                    toggleEmoji(!showEmoji) ||
                    (!showEmoji && togglePreview(false))
                  }
                >
                  <EmojiIcon />
                </span>
                <span
                  title={ctx.locale.preview}
                  className={cls('vicon vpreview-btn', {
                    actived: showPreview,
                  })}
                  onClick={() =>
                    togglePreview(!showPreview) ||
                    (!showPreview && toggleEmoji(false))
                  }
                >
                  <PreviewIcon />
                </span>
              </div>
            </div>
          </div>
          <div className="vrow">
            <div className="vcol vcol-30">
              <a
                alt="Markdown is supported"
                href="https://guides.github.com/features/mastering-markdown/"
                className="vicon"
                target="_blank"
                rel="noreferrer"
              >
                <MarkdownIcon />
              </a>
            </div>
            <div className="vcol vcol-70 text-right">
              <button
                type="button"
                disabled={submitting}
                title="Cmd|Ctrl+Enter"
                className="vsubmit vbtn"
                onClick={submitComment}
              >
                {ctx.locale.submit}
              </button>
            </div>
          </div>
          {showEmoji ? (
            <div className="vemojis">
              {Object.keys(ctx.emojiMaps).map((key) => (
                <i
                  title={key}
                  key={key}
                  onClick={() => insertAtCaret(editorRef.current, `:${key}:`)}
                >
                  <img
                    alt={key}
                    loading="lazy"
                    className="vemoji"
                    referrerPolicy="no-referrer"
                    src={
                      /^(?:https?:)?\/\//.test(ctx.emojiMaps[key])
                        ? ctx.emojiMaps[key]
                        : ctx.emojiCDN + ctx.emojiMaps[key]
                    }
                  />
                </i>
              ))}
            </div>
          ) : null}
          <div
            className="vinput vpreview"
            style={{ display: showPreview ? 'block' : 'none' }}
            dangerouslySetInnerHTML={{ __html: previewText }}
          ></div>
          <div className="vmark"></div>
        </div>
      </div>
    </div>
  );
}
