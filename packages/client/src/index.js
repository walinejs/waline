import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Context from './context';
import {
  Visitor,
  fetchCount,
  fetchRecent,
  injectDarkStyle,
  registMathML,
} from './utils';

import './styles/index.scss';

export function ReactComponent({
  path = location.pathname,
  avatar,
  avatarForce,
  avatarCDN,
  meta = ['nick', 'mail', 'link'],
  pageSize = 10,
  lang = 'zh-CN',
  langMode = {},
  locale = langMode,
  highlight,
  serverURL,
  emojiCDN,
  emojiMaps,
  requiredFields = [],
  requiredMeta = requiredFields,
  copyright = true,
  uploadImage,
  anonymous,
  placeholder,
  login = anonymous === true
    ? 'disable'
    : anonymous === false
    ? 'force'
    : 'enable',
  wordLimit = 0,
} = {}) {
  return (
    <Context
      placeholder={placeholder}
      lang={lang}
      locale={locale}
      emojiCDN={emojiCDN}
      emojiMaps={emojiMaps}
      avatar={avatar}
      avatarCDN={avatarCDN}
      avatarForce={avatarForce}
      uploadImage={uploadImage}
      wordLimit={wordLimit}
      login={login}
    >
      <App
        boxConfig={{
          serverURL,
          meta,
          highlight,
          requiredMeta,
          path,
        }}
        listConfig={{ path, pageSize, serverURL, avatar }}
        copyright={copyright}
      />
    </Context>
  );
}

export default function Waline({
  el,
  path = location.pathname,
  serverURL,
  visitor = false,
  dark,
  ...props
} = {}) {
  try {
    path = decodeURI(path);
  } catch (err) {
    // ignore error
  }
  // compat multiple slash
  serverURL = serverURL.replace(/\/+$/, '');

  if (dark) injectDarkStyle(dark);

  // visitor count
  if (visitor) {
    const addPromise = Visitor.post({ serverURL, path });

    const els = document.querySelectorAll(
      '.leancloud_visitors,.leancloud-visitors'
    );
    const countEls = [].filter.call(els, (el) => el.getAttribute('id'));
    const ids = [].map.call(countEls, (el) => {
      let id = el.getAttribute('id');
      try {
        id = decodeURI(id);
      } catch (e) {
        //ignore error
      }
      return id;
    });
    const restIds = ids.filter((id) => id !== path);

    if (!restIds.length) {
      addPromise.then((count) => Visitor.render(count, countEls));
    } else {
      const hasPath = restIds.length !== ids.length;
      (hasPath ? addPromise : Promise.resolve())
        .then(() => Visitor.get({ serverURL, path: ids }))
        .then((counts) => Visitor.render(counts, countEls));
    }
  }

  //comment count
  const $counts = [].filter.call(
    document.querySelectorAll('.waline-comment-count'),
    (el) => {
      if (!el.getAttribute('data-xid') && !el.getAttribute('id')) {
        return false;
      }
      if (el.innerText && el.innerText.trim()) {
        return false;
      }
      return true;
    }
  );
  if ($counts.length) {
    const paths = $counts.map((el) => {
      let path = el.getAttribute('data-xid') || el.getAttribute('id');
      try {
        path = decodeURI(path);
      } catch (e) {
        //ignore error
      }
      return path;
    });

    fetchCount({ serverURL, path: paths }).then((counts) => {
      if (!Array.isArray(counts)) {
        counts = [counts];
      }
      $counts.forEach((el, idx) => (el.innerText = counts[idx]));
    });
  }

  // mathml
  window.addEventListener('load', registMathML);

  // comment list display
  const root = document.querySelector(el);
  if (!root) {
    return;
  }

  props.path = path;
  props.serverURL = serverURL;
  ReactDOM.render(
    <React.StrictMode>
      <ReactComponent {...props} />
    </React.StrictMode>,
    root
  );
}

ReactComponent.version = Waline.version = VERSION;

ReactComponent.Widget = Waline.Widget = {
  RecentComments({ el, serverURL, count }) {
    //评论列表展示
    const root = document.querySelector(el);
    if (!root) {
      return Promise.resolve();
    }

    return fetchRecent({ serverURL, count }).then((comments) => {
      if (!comments.length) {
        return comments;
      }
      root.innerHTML = `
      <ul class="waline-widget-list">
      ${comments
        .map(
          (cmt) =>
            `<li class="waline-widget-item"><a href="${cmt.url}">${cmt.nick}</a>：${cmt.comment}</li>`
        )
        .join('')}
      </ul>`;

      return comments;
    });
  },
};
