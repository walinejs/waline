import { fetchVisitCount, postVisitCount } from "./fetch";

export default {
  add({serverURL, path, countEl = '.leancloud_visitors,.leancloud-visitors'}) {
    if(!serverURL || !path) {
      return;
    }
    
    return postVisitCount({serverURL, path}).then(count => {
      const countEls = [].filter.call(
        document.querySelectorAll(countEl),
        el => el.getAttribute('id')
      );
      if(!countEls.length) {
        return;
      }

      countEls.forEach(el => {
        let counterEl = el.querySelector('.leancloud-visitors-count');
        if(!counterEl) {
          counterEl = el;
        }
        counterEl.innerText = count;
      });
    });
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