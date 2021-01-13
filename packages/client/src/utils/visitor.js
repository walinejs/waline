import { fetchVisitCount, postVisitCount } from "./fetch";

export default {
  /**
   * 增加阅读统计
   */
  add({serverURL, path}) {
    if(!serverURL || !path) {
      return;
    }
    
    return postVisitCount({serverURL, path});
  },
  show({serverURL, countEl = '.leancloud_visitors,.leancloud-visitors'}) {
    const countEls = [].filter.call(
      document.querySelectorAll(countEl),
      el => el.getAttribute('id')
    );
    if(!countEls.length) {
      return;
    }

    const ids = [].map.call(countEls, el => {
      let id = el.getAttribute('id');
      try {
        id = decodeURI(id);
      } catch(e) {
        //ignore error
      }
      return id;
    });

    fetchVisitCount({serverURL, path: ids.join()}).then(counts => {
      if(!Array.isArray(counts)) {
        counts = [counts];
      }
      countEls.forEach((el, idx) => {
        let counterEl = el.querySelector('.leancloud-visitors-count');
        if(!counterEl) {
          counterEl = el;
        }
        counterEl.innerText = counts[idx];
      });
    });
  }
}