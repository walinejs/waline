function waline() {
  const Waline = require('@waline/client');
  new Waline({
    el: '#waline-comment',
    serverURL: 'https://waline.vercel.app',
    path: window.location.pathname,
    visitor: true,
  });
}

function renderValine(router) {
  router.afterEach(route => {
    let $page = document.querySelector('.page')
    let container = document.getElementById('waline-comment')
    if(container) {
      $page.removeChild(container);
    }
    
    if(route.path !== '/' && route.path !== '/visitor.html') {
      return;
    }
    
    container = document.createElement('div')
    container.id = route.path === '/' ? 'waline-comment' : 'waline-comment-invisible';
    container.className = 'page-nav'

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
    document && renderValine(router)
  } catch (e) {
    console.error(e.message)
  }
}