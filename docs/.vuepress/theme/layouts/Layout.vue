<template>
  <ParentLayout>
    <template #page-bottom>
      <div class="page-edit">
        <div id="waline-comment"></div>
        <script src="https://cdn.jsdelivr.net/npm/@waline/client/dist/Waline.min.js" ref="walineJs"></script>
      </div>
    </template>
  </ParentLayout>
</template>

<script>
import ParentLayout from '@parent-theme/layouts/Layout.vue'

export default {
  name: 'Layout',
  components: {
    ParentLayout
  },
  mounted () {
    this.initWaline();
    this.initJs();
  },
  methods: {
    initWaline() {
      try {
        new Waline({
          el: '#waline-comment',
          serverURL: 'https://waline.vercel.app',
          path: window.location.pathname,
          visitor: true,
          lang: location.pathname.startsWith('/en/') ? 'en' : 'zh-CN' 
        });
      } catch(e) {
        console.log(e);
      }
    },
    initJs() {
      const walineJs = this.$$refs.walineJs;
      if(walineJs) {
        walineJs.onload = this.initWaline;
        this.$router.afterEach(this.onRoute);
      }
    },
    onRoute(to, from) {
      if(to.path !== from.path) this.initWaline();
    }
  }
}
</script>