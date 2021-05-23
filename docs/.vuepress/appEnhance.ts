import { defineClientAppEnhance } from '@vuepress/client';

import MigrationTool from './components/MigrationTool.vue';

export default defineClientAppEnhance(({ app }) => {
  app.component('MigrationTool', MigrationTool);
});
