function detectFactory(u) {
  var _this = this;
  var match = {
      //内核
      'Trident': u.indexOf('Trident') > -1 || u.indexOf('NET CLR') > -1,
      'Presto': u.indexOf('Presto') > -1,
      'WebKit': u.indexOf('AppleWebKit') > -1,
      'Gecko': u.indexOf('Gecko/') > -1,
      //浏览器
      'Safari': u.indexOf('Safari') > -1,
      'Chrome': u.indexOf('Chrome') > -1 || u.indexOf('CriOS') > -1,
      'IE': u.indexOf('MSIE') > -1 || u.indexOf('Trident') > -1,
      'Edge': u.indexOf('Edge') > -1,
      'Firefox': u.indexOf('Firefox') > -1 || u.indexOf('FxiOS') > -1,
      'Firefox Focus': u.indexOf('Focus') > -1,
      'Chromium': u.indexOf('Chromium') > -1,
      'Opera': u.indexOf('Opera') > -1 || u.indexOf('OPR') > -1,
      'Vivaldi': u.indexOf('Vivaldi') > -1,
      'Yandex': u.indexOf('YaBrowser') > -1,
      'Kindle': u.indexOf('Kindle') > -1 || u.indexOf('Silk/') > -1,
      '360': u.indexOf('360EE') > -1 || u.indexOf('360SE') > -1,
      'UC': u.indexOf('UC') > -1 || u.indexOf(' UBrowser') > -1,
      'QQBrowser': u.indexOf('QQBrowser') > -1,
      'QQ': u.indexOf('QQ/') > -1,
      'Baidu': u.indexOf('Baidu') > -1 || u.indexOf('BIDUBrowser') > -1,
      'Maxthon': u.indexOf('Maxthon') > -1,
      'Sogou': u.indexOf('MetaSr') > -1 || u.indexOf('Sogou') > -1,
      'LBBROWSER': u.indexOf('LBBROWSER') > -1,
      '2345Explorer': u.indexOf('2345Explorer') > -1,
      'TheWorld': u.indexOf('TheWorld') > -1,
      'XiaoMi': u.indexOf('MiuiBrowser') > -1,
      'Quark': u.indexOf('Quark') > -1,
      'Qiyu': u.indexOf('Qiyu') > -1,
      'Wechat': u.indexOf('MicroMessenger') > -1,
      'Taobao': u.indexOf('AliApp(TB') > -1,
      'Alipay': u.indexOf('AliApp(AP') > -1,
      'Weibo': u.indexOf('Weibo') > -1,
      'Douban': u.indexOf('com.douban.frodo') > -1,
      'Suning': u.indexOf('SNEBUY-APP') > -1,
      'iQiYi': u.indexOf('IqiyiApp') > -1,
      //系统或平台
      'Windows': u.indexOf('Windows') > -1,
      'Linux': u.indexOf('Linux') > -1 || u.indexOf('X11') > -1,
      'Mac OS': u.indexOf('Macintosh') > -1,
      'Android': u.indexOf('Android') > -1 || u.indexOf('Adr') > -1,
      'Ubuntu': u.indexOf('Ubuntu') > -1,
      'FreeBSD': u.indexOf('FreeBSD') > -1,
      'Debian': u.indexOf('Debian') > -1,
      'Windows Phone': u.indexOf('IEMobile') > -1 || u.indexOf('Windows Phone')>-1,
      'BlackBerry': u.indexOf('BlackBerry') > -1 || u.indexOf('RIM') > -1,
      'MeeGo': u.indexOf('MeeGo') > -1,
      'Symbian': u.indexOf('Symbian') > -1,
      'iOS': u.indexOf('like Mac OS X') > -1,
      'Chrome OS': u.indexOf('CrOS') > -1,
      'WebOS': u.indexOf('hpwOS') > -1,
      //设备
      'Mobile': u.indexOf('Mobi') > -1 || u.indexOf('iPh') > -1 || u.indexOf('480') > -1,
      'Tablet': u.indexOf('Tablet') > -1 || u.indexOf('Pad') > -1 || u.indexOf('Nexus 7') > -1
  };
  //修正
  if (match['Mobile']) {
      match['Mobile'] = !(u.indexOf('iPad') > -1);
  }
  //基本信息
  var hash = {
      engine: ['WebKit', 'Trident', 'Gecko', 'Presto'],
      browser: ['Safari', 'Chrome', 'Edge', 'IE', 'Firefox', 'Firefox Focus', 'Chromium', 'Opera', 'Vivaldi', 'Yandex', 'Kindle', '360', 'UC', 'QQBrowser', 'QQ', 'Baidu', 'Maxthon', 'Sogou', 'LBBROWSER', '2345Explorer', 'TheWorld', 'XiaoMi', 'Quark', 'Qiyu', 'Wechat', 'Taobao', 'Alipay', 'Weibo', 'Douban','Suning', 'iQiYi'],
      os: ['Windows', 'Linux', 'Mac OS', 'Android', 'Ubuntu', 'FreeBSD', 'Debian', 'iOS', 'Windows Phone', 'BlackBerry', 'MeeGo', 'Symbian', 'Chrome OS', 'WebOS'],
      device: ['Mobile', 'Tablet']
  };
  _this.device = 'PC';
  // _this.language = (function () {
  //     var g = (nav.browserLanguage || nav.language);
  //     var arr = g.split('-');
  //     if (arr[1]) {
  //         arr[1] = arr[1].toUpperCase();
  //     }
  //     return arr.join('_');
  // })();
  for (var s in hash) {
      for (var i = 0; i < hash[s].length; i++) {
          var value = hash[s][i];
          if (match[value]) {
              _this[s] = value;
          }
      }
  }
  //系统版本信息
  var osVersion = {
      'Windows': function () {
          var v = u.replace(/^.*Windows NT ([\d.]+);.*$/, '$1');
          var hash = {
              '6.4': '10',
              '6.3': '8.1',
              '6.2': '8',
              '6.1': '7',
              '6.0': 'Vista',
              '5.2': 'XP',
              '5.1': 'XP',
              '5.0': '2000'
          };
          return hash[v] || v;
      },
      'Android': function () {
          return u.replace(/^.*Android ([\d.]+);.*$/, '$1');
      },
      'iOS': function () {
          return u.replace(/^.*OS ([\d_]+) like.*$/, '$1').replace(/_/g, '.');
      },
      'Debian': function () {
          return u.replace(/^.*Debian\/([\d.]+).*$/, '$1');
      },
      'Windows Phone': function () {
          return u.replace(/^.*Windows Phone( OS)? ([\d.]+);.*$/, '$2');
      },
      'Mac OS': function () {
          return u.replace(/^.*Mac OS X ([\d_]+).*$/, '$1').replace(/_/g, '.');
      },
      'WebOS': function () {
          return u.replace(/^.*hpwOS\/([\d.]+);.*$/, '$1');
      }
  }
  _this.osVersion = '';
  if (osVersion[_this.os]) {
      _this.osVersion = osVersion[_this.os]();
      if (_this.osVersion == u) {
          _this.osVersion = '';
      }
  }
  //浏览器版本信息
  var version = {
      'Safari': function () {
          return u.replace(/^.*Version\/([\d.]+).*$/, '$1');
      },
      'Chrome': function () {
          return u.replace(/^.*Chrome\/([\d.]+).*$/, '$1').replace(/^.*CriOS\/([\d.]+).*$/, '$1');
      },
      'IE': function () {
          return u.replace(/^.*MSIE ([\d.]+).*$/, '$1').replace(/^.*rv:([\d.]+).*$/, '$1');
      },
      'Edge': function () {
          return u.replace(/^.*Edge\/([\d.]+).*$/, '$1');
      },
      'Firefox': function () {
          return u.replace(/^.*Firefox\/([\d.]+).*$/, '$1').replace(/^.*FxiOS\/([\d.]+).*$/, '$1');
      },
      'Firefox Focus': function () {
          return u.replace(/^.*Focus\/([\d.]+).*$/, '$1');
      },
      'Chromium': function () {
          return u.replace(/^.*Chromium\/([\d.]+).*$/, '$1');
      },
      'Opera': function () {
          return u.replace(/^.*Opera\/([\d.]+).*$/, '$1').replace(/^.*OPR\/([\d.]+).*$/, '$1');
      },
      'Vivaldi': function () {
          return u.replace(/^.*Vivaldi\/([\d.]+).*$/, '$1');
      },
      'Yandex': function () {
          return u.replace(/^.*YaBrowser\/([\d.]+).*$/, '$1');
      },
      'Kindle': function () {
          return u.replace(/^.*Version\/([\d.]+).*$/, '$1');
      },
      'Maxthon': function () {
          return u.replace(/^.*Maxthon\/([\d.]+).*$/, '$1');
      },
      'QQBrowser': function () {
          return u.replace(/^.*QQBrowser\/([\d.]+).*$/, '$1');
      },
      'QQ': function () {
          return u.replace(/^.*QQ\/([\d.]+).*$/, '$1');
      },
      'Baidu': function () {
          return u.replace(/^.*BIDUBrowser[\s\/]([\d.]+).*$/, '$1');
      },
      'UC': function () {
          return u.replace(/^.*UC?Browser\/([\d.]+).*$/, '$1');
      },
      'Sogou': function () {
          return u.replace(/^.*SE ([\d.X]+).*$/, '$1').replace(/^.*SogouMobileBrowser\/([\d.]+).*$/, '$1');
      },
      '2345Explorer': function () {
          return u.replace(/^.*2345Explorer\/([\d.]+).*$/, '$1');
      },
      'TheWorld': function () {
          return u.replace(/^.*TheWorld ([\d.]+).*$/, '$1');
      },
      'XiaoMi': function () {
          return u.replace(/^.*MiuiBrowser\/([\d.]+).*$/, '$1');
      },
      'Quark': function () {
          return u.replace(/^.*Quark\/([\d.]+).*$/, '$1');
      },
      'Qiyu': function () {
          return u.replace(/^.*Qiyu\/([\d.]+).*$/, '$1');
      },
      'Wechat': function () {
          return u.replace(/^.*MicroMessenger\/([\d.]+).*$/, '$1');
      },
      'Taobao': function () {
          return u.replace(/^.*AliApp\(TB\/([\d.]+).*$/, '$1');
      },
      'Alipay': function () {
          return u.replace(/^.*AliApp\(AP\/([\d.]+).*$/, '$1');
      },
      'Weibo': function () {
          return u.replace(/^.*weibo__([\d.]+).*$/, '$1');
      },
      'Douban': function () {
          return u.replace(/^.*com.douban.frodo\/([\d.]+).*$/, '$1');
      },
      'Suning': function () {
          return u.replace(/^.*SNEBUY-APP([\d.]+).*$/, '$1');
      },
      'iQiYi': function () {
          return u.replace(/^.*IqiyiVersion\/([\d.]+).*$/, '$1');
      }
  };
  _this.version = '';
  if (version[_this.browser]) {
      _this.version = version[_this.browser]();
      if (_this.version == u) {
          _this.version = '';
      }
  }
  //修正
  if (_this.browser == 'Edge') {
      _this.engine = 'EdgeHTML';
  } else if (_this.browser == 'Chrome' && parseInt(_this.version) > 27) {
      _this.engine = 'Blink';
  } else if (_this.browser == 'Opera' && parseInt(_this.version) > 12) {
      _this.engine = 'Blink';
  } else if (_this.browser == 'Yandex') {
      _this.engine = 'Blink';
  }else if(_this.browser == undefined){
      _this.browser = 'Unknow App'
  }
};

function detect(u){
  return new detectFactory(u);
}
module.exports = detect