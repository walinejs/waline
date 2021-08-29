import { defineComponent, onMounted, onBeforeUnmount } from 'vue';
import { Fancybox as NativeFancybox } from '@fancyapps/ui/dist/fancybox.esm.js';
import '@fancyapps/ui/dist/fancybox.css';
import './Fancybox.scss';

export default defineComponent({
  name: 'Fancybox',
  setup() {
    onMounted(() => NativeFancybox.bind('#waline-comment .vcontent img'));
    onBeforeUnmount(() => NativeFancybox.destroy());
  },
});
