function waline() {
  const Waline = require('@waline/client');
  new Waline({
    el: '#waline-comment',
    serverURL: 'https://waline.vercel.app',
    path: window.location.pathname,
    visitor: true,
    lang: location.pathname.startsWith('/en/') ? 'en' : 'zh-CN' 
  });
}

function renderWaline(router) {
  setTimeout(()=>{
    if(!globalThis.window) {
      return;
    }
    let $page = document.querySelector('.page')
    let container = document.getElementById('waline-comment')
    if(container) {
      $page.removeChild(container);
    }
    
    container = document.createElement('div')
    container.id = 'waline-comment';
    container.className = 'page-nav';
    $page.appendChild(container);
    
    waline()
  }, 1000);

  router.afterEach(_ => {
    let $page = document.querySelector('.page')
    let container = document.getElementById('waline-comment')
    if(container) {
      $page.removeChild(container);
    }
    
    container = document.createElement('div')
    container.id = 'waline-comment';
    container.className = 'page-nav';

    if ($page){
      $page.appendChild(container)
      waline()
    }else{
      setTimeout(()=>{
        $page = document.querySelector('.page')
        $page.appendChild(container)
        waline()
      }, 1000)
    }
  })
}

export default ({router}) => {
  try {
    document && renderWaline(router)
  } catch (e) {
    console.error(e.message)
  }
}