<template>
  <form>
    <div style="margin-bottom: 20px">
      <div class="input-group">
        <label for="from">{{ i18n.from }}</label>
        <select id="from" v-model="from">
          <option value="valine">Valine</option>
          <option value="disqus">Disqus</option>
          <option value="twikoo">Twikoo</option>
          <option value="typecho">Typecho</option>
          <option value="artalk">Artalk</option>
          <option value="commento">Commento</option>
        </select>
      </div>
      <div class="input-group">
        <label for="to">{{ i18n.to }}</label>
        <select id="to" v-model="to">
          <option value="wleancloud">Waline LeanCloud</option>
          <option value="wcloudbase">Waline CloudBase</option>
          <option value="wsql">Waline MySQL/PostgreSQL/SQLite</option>
          <option value="wgithub">Github</option>
        </select>
      </div>
      <div class="input-group">{{ i18n.storage }}</div>
    </div>
    <div class="warning custom-block" v-if="from === 'typecho'">
      <p class="custom-block-title">{{ i18n.tip }}</p>
      <p v-html="i18n.typeecho" />
    </div>
    <div
      class="warning custom-block"
      v-else-if="from === 'valine' && to === 'wleancloud'"
    >
      <p class="custom-block-title">{{ i18n.tip }}</p>
      <p v-text="i18n.tip" />
    </div>
    <div v-else>
      <textarea :placeholder="i18n.placeholder" v-model="source"></textarea>
      <button @click="click">{{ i18n.convert }}</button>
    </div>
  </form>
</template>
<script setup>
import { useRouteLocale } from '@vuepress/client';
import { computed, defineComponent, ref } from 'vue';
import { exportRaw } from './exportRaw';
import { migrateI18n } from './i18n';
import { transform } from './transform';

const routeLocalePath = useRouteLocale();
const from = ref('valine');
const to = ref('wcloudbase');
const source = ref('');

const i18n = computed(() => migrateI18n[routeLocalePath.value]);

const click = (event) => {
  event.preventDefault();

  if (!source.value) {
    return alert('请输入内容');
  }

  if (from.value === 'valine') {
    // 适配 LeanCloud 国内版导出非标准 JSON 情况
    source.value = source.value.trim();

    if (source.value.match(/},[\r\n]+/)) {
      source.value = JSON.parse(source.value);
    } else {
      source.value = JSON.parse(
        `{"results":[ ${source.value.split(/[\r\n]+/).join(',')} ]}`
      );
    }
  }

  const act = transform[from.value][to.value];

  if (typeof act === 'function') {
    let text = act(source.value);
    console.log(text);

    if (typeof text !== 'string') {
      text = JSON.stringify(text, null, '\t');
    }

    exportRaw('output.' + (to.value !== 'wsql' ? 'json' : 'csv'), text);
  }
};
</script>

<style scoped>
textarea {
  width: 100%;
  height: 200px;
  border: 1px solid #eaecef;
  border-radius: 3px;
  padding: 10px;
}

button {
  font-size: 17px;
  line-height: 2em;
  padding: 0 20px;
  border: none;
  background: #3eaf7c;
  color: #fff;
  border-radius: 3px;
  cursor: pointer;
}

.input-group {
  display: inline-block;
  font-size: 20px;
}

select {
  border: 2px solid #eaecef;
  font-size: 20px;
  padding: 5px 10px;
  border-radius: 3px;
}
</style>
