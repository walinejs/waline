import MigrationTool from './components/MigrationTool.vue';

function waline() {
  const Waline = require('@waline/client');
  new Waline({
    el: '#waline-comment',
    serverURL: 'https://waline.vercel.app',
    path: window.location.pathname,
    visitor: true,
    lang: location.pathname.startsWith('/en/') ? 'en' : 'zh-CN',
    langMode: {
      admin: location.pathname.startsWith('/en/')
        ? 'Administrator'
        : '可爱的管理员',
    },
  });
}

function renderTips(isHome = false) {
  let tips = document.getElementById('waline-tips');
  if (tips) {
    return false;
  }

  tips = document.createElement('div');
  tips.id = 'waline-tips';
  if (!isHome) {
    tips.className = 'page-nav';
  }
  const styles = {
    padding: '10px',
    boxSizing: 'border-box',
    border: '1px solid #e2e2e2',
    backgroundColor: '#FFFFC0',
    borderLeft: '5px solid #FFF000',
    color: '#333',
    margin: '1rem auto',
  };
  for (const name in styles) {
    tips.style[name] = styles[name];
  }

  tips.innerHTML = location.pathname.startsWith('/en/')
    ? 'TIPS: The comment area is only for demo. If you have any questions, please go to <a href="https://github.com/lizheming/waline/discussions" target="_blank">Github Discussion</a> to ask.'
    : '友情提示：评论区仅作评论展示，如有问题咨询请去 <a href="https://github.com/lizheming/waline/discussions" target="_blank">Github Discussion</a> 中提问。';

  return tips;
}

function renderWaline(router) {
  setTimeout(() => {
    if (!globalThis.window) {
      return;
    }
    let $page = document.querySelector('.page,.home .theme-default-content');
    let tips = renderTips($page.classList.contains('theme-default-content'));
    if (tips) {
      $page.appendChild(tips);
    }

    let container = document.getElementById('waline-comment');
    if (container) {
      $page.removeChild(container);
    }

    container = document.createElement('div');
    container.id = 'waline-comment';
    if (!$page.classList.contains('theme-default-content')) {
      container.className = 'page-nav';
    }
    $page.appendChild(container);

    waline();
  }, 1000);

  router.afterEach((_) => {
    let $page = document.querySelector('.page,.home .theme-default-content');
    let tips = renderTips();

    let container = document.getElementById('waline-comment');
    if (container) {
      $page.removeChild(container);
    }

    container = document.createElement('div');
    container.id = 'waline-comment';
    if (!$page.classList.contains('theme-default-content')) {
      container.className = 'page-nav';
    }

    if ($page) {
      if (tips) {
        $page.appendChild(tips);
      }
      $page.appendChild(container);
      waline();
    } else {
      setTimeout(() => {
        $page = document.querySelector('.page,.home .theme-default-content');
        $page.appendChild(container);
        waline();
      }, 1000);
    }
  });
}

export default ({ app, router }) => {
  app.component('MigrationTool', MigrationTool);

  try {
    if (!__SSR__) renderWaline(router);
  } catch (e) {
    console.error(e.message);
  }
};
