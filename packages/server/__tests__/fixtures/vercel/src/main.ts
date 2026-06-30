import { init } from '../../../../../client/src/entries/init.ts';
import '../../../../../client/src/styles/index.scss';

init({
  el: '#waline',
  serverURL: window.location.origin,
  path: window.location.pathname,
});
