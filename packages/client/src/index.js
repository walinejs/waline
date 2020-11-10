import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Context from './context';
import './index.css';

export default function Waline({
  el, 
  placeholder = "Just Go Go.", 
  path = location.pathname, 
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
