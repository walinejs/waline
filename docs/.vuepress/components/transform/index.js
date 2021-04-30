import { artalk2lc } from './artalk2lc';
import { commento2lc } from './commento2lc';
import { disqus2lc } from './disqus2lc';
import { lc2csv } from './lc2csv';
import { lc2tcb } from './lc2tcb';
import { tk2lc } from './tk2lc';

export const transform = {
  disqus: {
    wleancloud: disqus2lc,
    wcloudbase(data) {
      return lc2tcb(disqus2lc(data));
    },
    wsql(data) {
      return lc2csv(disqus2lc(data));
    },
    wgithub(data) {
      return lc2csv(disqus2lc(data));
    },
  },
  valine: {
    wcloudbase: lc2tcb,
    wsql: lc2csv,
    wgithub: lc2csv,
  },
  twikoo: {
    wleancloud: tk2lc,
    wcloudbase(data) {
      return lc2tcb(tk2lc(data));
    },
    wsql(data) {
      return lc2csv(tk2lc(data));
    },
    wgithub(data) {
      return lc2csv(tk2lc(data));
    },
  },
  artalk: {
    wleancloud: artalk2lc,
    wcloudbase(data) {
      return lc2tcb(artalk2lc(data));
    },
    wsql(data) {
      return lc2csv(artalk2lc(data));
    },
    wgithub(data) {
      return lc2csv(artalk2lc(data));
    },
  },
  commento: {
    wleancloud: commento2lc,
    wcloudbase(data) {
      return lc2tcb(commento2lc(data));
    },
    wsql(data) {
      return lc2csv(commento2lc(data));
    },
    wgithub(data) {
      return lc2csv(commento2lc(data));
    },
  },
};
