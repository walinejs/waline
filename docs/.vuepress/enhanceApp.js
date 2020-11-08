function waline() {
  const Waline = require('@waline/client');
  new Waline({
    el: '#waline',
    serverURL: 'https://waline.vercel.app',
    path: window.location.pathname
  });
}

function renderValine(router) {
  router.afterEach(_ => {
    let $page = document.querySelector('.page')
    let container = document.getElementById('waline')
    if(!container){
      container = document.createElement('div')
      container.id = 'waline'
      container.className = 'page-nav'
    }
    if ($page && !container){
      $page.appendChild(container)
    }else{
      setTimeout(()=>{
        $page = document.querySelector('.page')
        $page.appendChild(container)
        waline()
      }, 1000)
    }
    waline()
  })
}

export default ({router}) => {
  try {
    document && renderValine(router)
  } catch (e) {
    console.error(e.message)
  }
}