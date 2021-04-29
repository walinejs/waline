import { fetchVisitCount, postVisitCount } from './fetch';

export default {
  post({ serverURL, path }) {
    if (!serverURL || !path) {
      return null;
    }

    return postVisitCount({ serverURL, path });
  },
  get({ serverURL, path }) {
    if (!path.length) {
      return;
    }

    return fetchVisitCount({ serverURL, path: path.join() });
  },
  render(counts, countEls) {
    if (!Array.isArray(counts)) {
      counts = new Array(countEls.length).fill(counts);
    }
    countEls.forEach((el, idx) => {
      let counterEl = el.querySelector('.leancloud-visitors-count');
      if (!counterEl) {
        counterEl = el;
      }
      counterEl.innerText = counts[idx];
    });
  },
};
