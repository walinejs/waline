import React, { useCallback, useContext, useEffect, useReducer, useRef, useState } from 'react';
import cls from 'classnames';
import marked from 'marked';
import hanabi from 'hanabi';
import autosize from 'autosize';
import { ConfigContext } from '../context';
import { CancelReplyIcon, EmojiIcon, MarkdownIcon, PreviewIcon } from './Icons';
import { postComment } from '../utils/fetch';

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
    } catch(e) {
      return;
    }
  },
  setItem(comment) {
    localStorage.setItem(CACHE_KEY, JSON.stringify(comment));
  }
};

function escapeHTML(text) {
  const arr = [
    ['<', '&lt;'],
    ['>', '&gt;'],
    ['"', '&quot;'],
    ["'", '&#39;']
  ];
  arr.forEach(([target, replaced]) => 
    (text = text.replace(new RegExp(target, 'g'), replaced))
  );
  return text;
}


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
    field.value = field.value.substring(0, startPos) + val + field.value.substring(endPos, field.value.length);
    field.focus();
    field.selectionStart = startPos + val.length;
    field.selectionEnd = startPos + val.length;
    field.scrollTop = scrollTop;
  } else {
    field.focus();
    field.value += val;
  }
}

function onPasteFactory(editorRef, uploadImage = new Function, insertAtCaret) {
  return function(e) {
    const field = editorRef.current;
    const clipboardData = 'clipboardData' in e ? e.clipboardData : (e.originalEvent && e.originalEvent.clipboardData || window.clipboardData);
    const files = [];
    const items = clipboardData && clipboardData.items;
    if(items && items.length) {
      // 检索剪切板items
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
          files.push(items[i].getAsFile());
          break;
        }
      }
    }
    if(files.length) {
      files.forEach(file => {
        const uploadText = `![Uploading ${file['name']}]()`;
        insertAtCaret(field, uploadText);
        return Promise.resolve().then(_ => uploadImage(file)).then(ret => 
          (field.value = field.value.replace(uploadText, `\r\n![${file.name}](${ret.data || ret})`))  
        );
      });
    }
  }
}

function parseEmoji(text, emojiMaps, emojiCDN) {
  if(!text) {
    return text;
  }
  return text.replace(/:(.+?):/g, (placeholder, key) => {
    if(!emojiMaps[key]) {
      return placeholder;
    }
    
    return `![${key}](${/(?:https?:)?\/\//.test(emojiMaps[key]) ? emojiMaps[key] : emojiCDN + emojiMaps[key]})`;
  });
}

export default function({
  placeholder, 
  meta, 
  highlight,
  path,
  requiredFields,
  replyId,
  replyUser, 
  rootId,
  serverURL,
  onCanelReply,
  onSubmit
}) {
  const inputsRef = {
    nick: useRef(null),
    mail: useRef(null),
    link: useRef(null)
  };
  const editorRef = useRef(null);
  const [showEmoji, toggleEmoji] = useState(false);
  const [showPreview, togglePreview] = useState(false);
  const [previewText, setPreviewText] = useState('');
  const [comment, dispatch] = useReducer((state, action) => ({...state, ...action}), {
    comment: '',
    nick: store.getItem('nick') || '',
    mail: store.getItem('mail') || '',
    link: store.getItem('link') || '',
    ua: navigator.userAgent,
    url: path
  });
  const [submitting, setSubmitting] = useState(false);

  const ctx = useContext(ConfigContext);
  const onChange = useCallback(e => {
    const comment = e.target.value;
    dispatch({comment});
    const preview = marked(parseEmoji(escapeHTML(comment), ctx.emojiMaps, ctx.emojiCDN));
    setPreviewText(preview);
    comment ? autosize(e.target) : autosize.destroy(e.target);
  }, []);
  const insertAtCaret = (field, val) => {
    _insertAtCaret(field, val);
    onChange({target: field});
  };

  const onKeyDown = useCallback(e => {
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
  const onPaste = useCallback(onPasteFactory(editorRef, ctx.uploadImage, insertAtCaret), []);
  const submitComment = useCallback(() => {
    if(requiredFields.indexOf('nick') > -1 && comment.nick.length < 2) {
      inputsRef.nick.current.focus();
      return;
    }
    if (requiredFields.indexOf('mail') > -1 && (comment.mail.length < 6 || comment.mail.indexOf('@') < 1 || comment.mail.indexOf('.') < 3)) {
      inputsRef.mail.current.focus();
      return;
    }
    if (comment.comment === '') {
      editorRef.current.focus();
      return;
    }
    comment.nick = comment.nick || 'Anonymous';
    comment.comment = parseEmoji(comment.comment, ctx.emojiMaps, ctx.emojiCDN);
    if(replyId && rootId) {
      comment.pid = replyId;
      comment.rid = rootId;
      comment.at = replyUser;
    }

    setSubmitting(true);
    postComment({serverURL, comment}).then(resp => {
      setSubmitting(false);
      onSubmit(resp);
      store.setItem({
        nick: comment.nick,
        link: comment.link,
        mail: comment.mail
      });
    }, _ => setSubmitting(false));
  }, [comment]);

  useEffect(() => {
    marked.setOptions({
      renderer: new marked.Renderer(),
      highlight: highlight === false ? null : hanabi,
      gfm: true,
      tables: true,
      breaks: true,
      pedantic: false,
      sanitize: true,
      smartLists: true,
      smartypants: true
    });
  }, []);
  const metaFields = meta.filter(kind => META.indexOf(kind) > -1);

  return (
    <div className="vpanel">
      <div className="vwrap">
        {replyId ? (
          <p 
            className="cancel-reply text-right" 
            title={ctx.locale.cancelReply} 
            onClick={onCanelReply}
          >
            <CancelReplyIcon />
          </p>
        ) : null}

        <div className={`vheader item${metaFields.length}`}>
          {metaFields.map(kind => (
            <input 
              key={kind}
              name={kind} 
              ref={inputsRef[kind]}
              defaultValue={comment[kind]}
              className={`v${kind} vinput`}
              placeholder={ctx.locale[kind]}
              type={kind === 'mail' ? 'email' : 'text'}   
              onChange={e => dispatch({[kind]: e.target.value})}
            />
          ))}
        </div>
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
                className={cls('vicon vemoji-btn', {actived: showEmoji})} 
                onClick={_ => toggleEmoji(!showEmoji) || (!showEmoji && togglePreview(false))}
              >
                <EmojiIcon />
              </span>
              <span 
                title={ctx.locale.preview} 
                className={cls('vicon vpreview-btn', {actived: showPreview})}
                onClick={_ => togglePreview(!showPreview) || (!showPreview && toggleEmoji(false))}
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
            >{ctx.locale.reply}</button>
          </div>
        </div>
        {showEmoji ? (
          <div className="vemojis">
            {Object.keys(ctx.emojiMaps).map(key => (
              <i title={key} key={key} onClick={_ => insertAtCaret(editorRef.current, `:${key}:`)}>
                <img 
                  alt={key} 
                  loading="lazy"
                  className="vemoji"
                  referrerPolicy="no-referrer"
                  src={/^(?:https?:)?\/\//.test(ctx.emojiMaps[key]) ? ctx.emojiMaps[key] : ctx.emojiCDN + ctx.emojiMaps[key]} 
                />
              </i>
            ))}
          </div>
        ) : null}
        <div 
          className="vinput vpreview" 
          style={{display: showPreview ? 'block' : 'none'}}
          dangerouslySetInnerHTML={{__html: previewText}}
        ></div>
        <div className="vmark"></div>
      </div>
    </div>
  );
}