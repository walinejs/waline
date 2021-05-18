import React, { useState } from 'react';
import locales from './i18n';
import { emojiCDN, emojiMaps, gravatarSetting } from './utils';

export const ConfigContext = React.createContext({
  locales,
  locale: {},
  emojiCDN,
  emojiMaps,
  gravatarSetting,
  userInfo: {
    nick: '',
    mail: '',
  },
});

export default function Context(props) {
  const locale = locales[props.lang] || locales['zh-CN'];
  if (typeof props.locale === 'object') {
    for (const k in props.locale) {
      if (!props.locale[k]) {
        continue;
      }
      locale[k] = props.locale[k];
    }
  }

  if (props.placeholder && !props.locale.placeholder) {
    locale.placeholder = props.placeholder;
  }

  let initUser = {};
  try {
    const KEY = 'WALINE_USER';
    initUser =
      JSON.parse(localStorage.getItem(KEY) || sessionStorage.getItem(KEY)) ||
      {};
  } catch (e) {
    // catch
  }
  const [userInfo, setUserInfo] = useState(initUser);

  const context = {
    locales,
    locale,
    lang: props.lang,
    wordLimit: Array.isArray(props.wordLimit)
      ? props.wordLimit
      : props.wordLimit === 0
      ? false
      : [0, props.wordLimit],
    emojiCDN: props.emojiCDN || emojiCDN,
    emojiMaps: props.emojiMaps || emojiMaps,
    gravatarSetting: {
      cdn: props.avatarCDN || gravatarSetting.cdn,
      ds: gravatarSetting.ds,
      params: `?d=${
        gravatarSetting.ds.indexOf(props.avatar) > -1 ? props.avatar : 'mp'
      }${
        props.avatarForce ? '&q=' + Math.random().toString(32).substring(2) : ''
      }`,
    },
    uploadImage:
      typeof props.uploadImage === 'function'
        ? props.uploadImage
        : function (file) {
            const formData = new FormData();
            formData.append('image', file);

            return fetch('https://pic.alexhchu.com/api/upload', {
              method: 'POST',
              body: formData,
            })
              .then((resp) => resp.json())
              .then((resp) => resp.data.url);
          },
    userInfo,
    setUserInfo,
    login: props.login,
  };

  return (
    <ConfigContext.Provider value={context}>
      {props.children}
    </ConfigContext.Provider>
  );
}
