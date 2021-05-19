import React, {
  useCallback,
  useContext,
  useMemo,
  useReducer,
  useRef,
  useState,
} from 'react';
import autosize from 'autosize';
import cls from 'classnames';
import { ConfigContext } from '../context';
import {
  CloseIcon,
  EmojiIcon,
  LoadingIcon,
  MarkdownIcon,
  PreviewIcon,
} from './Icons';
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
  meta,
  highlight,
  path,
  requiredMeta,
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
  const [wordNumber, setWordNumber] = useState(0);
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

  const [textLimit, isWordNumberLegal] = useMemo(() => {
    const { wordLimit } = ctx;

    if (wordLimit) {
      if (wordNumber < wordLimit[0] && wordLimit[0] !== 0) {
        return [wordLimit[0], false];
      }

      if (wordNumber > wordLimit[1]) {
        return [wordLimit[1], false];
      }

      return [wordLimit[1], true];
    }

    return [0, true];
  }, [ctx, wordNumber]);

  const onChange = useCallback((e) => {
    const comment = e.target.value;
    dispatch({ comment });
    const preview = parser(comment);

    setPreviewText(preview);

    const wordCount = getWordNumber(comment);

    setWordNumber(wordCount);

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
      if (ctx.login === 'force') return;

      if (requiredMeta.indexOf('nick') > -1 && comment.nick.length < 2) {
        inputsRef.nick.current.focus();
        return;
      }

      if (
        requiredMeta.indexOf('mail') > -1 &&
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

    if (!isWordNumberLegal) {
      return alert(
        ctx.locale.wordHint
          .replace('$0', wordLimit[0])
          .replace('$1', wordLimit[1])
          .replace('$2', wordNumber)
      );
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
    <div className="vcomment">
      {replyId ? (
        <div
          className="vclose"
          title={ctx.locale.cancelReply}
          role="button"
          onClick={onCancelReply}
        >
          <CloseIcon size={24} />
        </div>
      ) : null}

      {ctx.login === 'disable' ? null : (
        <div className="vlogin">
          {!ctx.userInfo.token ? (
            <a className="vlogin-btn" role="button" onClick={onLogin}>
              {ctx.locale.login}
            </a>
          ) : (
            <div className="vlogin-info">
              <div className="vavatar">
                <div
                  title={ctx.locale.logout}
                  className="vlogout-btn"
                  role="button"
                  onClick={onLogout}
                >
                  <CloseIcon size={14} />
                </div>

                <img
                  src={
                    ctx.userInfo.avatar ||
                    ctx.gravatarSetting.cdn +
                      ctx.userInfo.mailMd5 +
                      ctx.gravatarSetting.params
                  }
                  alt="avator"
                />
              </div>
              <a href="#" className="vlogin-nick" onClick={onProfile}>
                {ctx.userInfo.display_name}
              </a>
            </div>
          )}
        </div>
      )}

      <div className="vpanel">
        {ctx.login === 'force' || ctx.userInfo.token ? null : (
          <div className={`vheader vheader-${metaFields.length}`}>
            {metaFields.map((kind) => (
              <div className="vheader-item" key={kind}>
                <label>{ctx.locale[kind]}</label>
                <input
                  name={kind}
                  ref={inputsRef[kind]}
                  defaultValue={comment[kind]}
                  className={`vinput v${kind}`}
                  type={kind === 'mail' ? 'email' : 'text'}
                  onChange={(e) => dispatch({ [kind]: e.target.value })}
                />
              </div>
            ))}
          </div>
        )}

        <textarea
          className="veditor"
          id="vedit"
          ref={editorRef}
          placeholder={replyUser ? `@${replyUser}` : ctx.locale.placeholder}
          onKeyDown={onKeyDown}
          onPaste={onPaste}
          onChange={onChange}
        />

        <div
          className="vpreview"
          style={{ display: showPreview ? 'block' : 'none' }}
        >
          <h4>{ctx.locale.preview}:</h4>
          <div
            className="vcontent"
            dangerouslySetInnerHTML={{ __html: previewText }}
          />
        </div>

        <div className="vfooter">
          <div className="vaction">
            <a
              alt="Markdown is supported"
              href="https://guides.github.com/features/mastering-markdown/"
              className="vicon"
              target="_blank"
              rel="noreferrer"
              title="Markdown Guide"
            >
              <MarkdownIcon />
            </a>

            <span
              className={cls('vicon', { actived: showEmoji })}
              title={ctx.locale.emoji}
              role="button"
              onClick={() =>
                toggleEmoji(!showEmoji) || (!showEmoji && togglePreview(false))
              }
            >
              <EmojiIcon />
            </span>

            <span
              className={cls('vicon', {
                actived: showPreview,
              })}
              title={ctx.locale.preview}
              role="button"
              onClick={() =>
                togglePreview(!showPreview) ||
                (!showPreview && toggleEmoji(false))
              }
            >
              <PreviewIcon />
            </span>
          </div>

          <div className="vinfo">
            <div className="vtext-number">
              {wordNumber}
              {ctx.wordLimit ? (
                <span>
                  &nbsp;/&nbsp;
                  <span className={cls({ illegal: !isWordNumberLegal })}>
                    {textLimit}
                  </span>
                </span>
              ) : null}
              &nbsp;{ctx.locale.word}
            </div>

            <button
              className="vbtn"
              title="Cmd|Ctrl+Enter"
              disabled={submitting}
              onClick={submitComment}
            >
              {submitting ? <LoadingIcon size={16} /> : ctx.locale.submit}
            </button>
          </div>

          {showEmoji ? (
            <div className="vemoji-wrapper">
              {Object.keys(ctx.emojiMaps).map((key) => (
                <i
                  title={key}
                  role="button"
                  key={key}
                  onClick={() => insertAtCaret(editorRef.current, `:${key}:`)}
                >
                  <img
                    className="vemoji"
                    src={
                      /^(?:https?:)?\/\//.test(ctx.emojiMaps[key])
                        ? ctx.emojiMaps[key]
                        : ctx.emojiCDN + ctx.emojiMaps[key]
                    }
                    alt={key}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                </i>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
