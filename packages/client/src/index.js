import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Context from './context';
import './index.css';

function Valine({
  el, 
  placeholder = "撰写评论...", 
  path = "", 
  avatar, 
  avatarForce,
  avatarCDN,
  meta = ['nick','mail','link'], 
  pageSize = 10, 
  lang = "zh-cn",
  highlight, 
  serverURL,
  emojiCDN,
  emojiMaps,
  requiredFields = [],
  copyRight = true
} = {}) {
  ReactDOM.render(
    <React.StrictMode>
      <Context 
        lang={lang} 
        emojiCDN={emojiCDN} 
        emojiMaps={emojiMaps}
        avatar={avatar}
        avatarCDN={avatarCDN}
        avatarFore={avatarForce}
      >
        <App 
          boxConfig={{serverURL, placeholder, meta, highlight, requiredFields, path}}
          listConfig={{path, pageSize, serverURL, avatar}}
          copyRight={copyRight}
        />
      </Context>
    </React.StrictMode>,
    document.querySelector(el)
  );
}

new Valine({
  el: '#root',
  lang: 'en',
  copyRight: false,
  placeholder: '哈哈哈哈哈',
  path: '/guestbook.html',
  serverURL: 'http://localhost:3000'
});