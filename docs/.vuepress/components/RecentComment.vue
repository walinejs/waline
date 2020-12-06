<template>
  <div class="widget">
    <h3>最近评论效果</h3>
    <div id="waline-recent" ref="recent"></div>
  </div>
</template>
<script>
import Waline from '@waline/client';

export default {
  mounted() {
    if(this.$refs.recent) {
      Waline.Widget.RecentComments({
        el: '#waline-recent',
        serverURL: 'https://waline.vercel.app',
        count: 10
      });
    }
  }
}
</script>

<style type="text/css">
#waline-recent .waline-widget-item {
  max-height: 2em;
  overflow: hidden;
}
</style>