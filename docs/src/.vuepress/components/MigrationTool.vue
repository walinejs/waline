<script setup lang="ts">
import { useLocaleConfig } from '@vuepress/helper/client';
import { ref } from 'vue';

import {
  type OriginalType,
  type TransformType,
  exportRaw,
  transform,
} from '../utils/index.js';

const from = ref<OriginalType | 'typecho'>('valine');
const to = ref<TransformType>('wcloudbase');
const source = ref('');

const i18n = useLocaleConfig({
  // eslint-disable-next-line @typescript-eslint/naming-convention
  '/': {
    from: '从',
    to: '迁移至',
    storage: '存储服务',
    placeholder: '请将源文件粘贴至此',
    convert: '转换',
    title: '友情提示',
    typecho: `Typecho 用户可以使用
        <a
          href="https://github.com/lizheming/typecho-export-valine"
          target="_blank"
          >Export2Valine</a
        >
        插件将评论数据导出成 Valine 数据后直接使用。`,
    tip: 'Waline 和 Valine 的 LeanCloud 配置是可以共用的，不需要进行数据转换哦！',
  },
  // eslint-disable-next-line @typescript-eslint/naming-convention
  '/en/': {
    from: 'Migrate from',
    to: 'to',
    storage: 'Storage service',
    placeholder: 'Please paste your source file here',
    convert: 'Convert',
    title: 'Tip',
    typecho: `Typecho users can use
        <a
          href="https://github.com/lizheming/typecho-export-valine"
          target="_blank"
          >Export2Valine Plugin</a
        >
        to export comment data to Valine format.`,
    tip: 'The LeanCloud configuration of Waline and Valine can be shared, no data conversion is required!',
  },
});

const click = (): void => {
  if (!source.value) {
    alert('请输入内容');

    return;
  }

  let data = source.value;

  if (from.value === 'valine') {
    // 适配 LeanCloud 国内版导出非标准 JSON 情况
    if (/},[\r\n]+/.test(source.value)) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      data = JSON.parse(source.value.trim());
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      data = JSON.parse(
        `{"results":[ ${source.value
          .trim()
          .split(/[\r\n]+/)
          .join(',')} ]}`,
      );
    }
  }

  const act = transform[from.value as OriginalType][to.value];

  if (typeof act === 'function') {
    let text = act(data);

    if (typeof text !== 'string') {
      text = JSON.stringify(text, null, '\t');
    }

    exportRaw(
      'output.' + (to.value !== 'wsql' ? 'json' : 'csv'),
      text as string,
    );
  }
};
</script>

<template>
  <form>
    <div class="selector">
      <div class="input-group">
        <label for="from">{{ i18n.from }}&nbsp;</label>

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
        <label for="to">&nbsp;{{ i18n.to }}&nbsp;</label>

        <select id="to" v-model="to">
          <option value="wleancloud">Waline LeanCloud</option>

          <option value="wcloudbase">Waline CloudBase</option>

          <option value="wsql">Waline MySQL/PostgreSQL/SQLite</option>

          <option value="wgithub">Github</option>
        </select>
      </div>

      <div class="input-group">&nbsp;{{ i18n.storage }}</div>
    </div>

    <div v-if="from === 'typecho'" class="custom-block warning">
      <p class="custom-block-title">{{ i18n.tip }}</p>

      <!-- eslint-disable-next-line vue/no-v-html -->
      <p v-html="i18n.typecho" />
    </div>

    <div
      v-else-if="from === 'valine' && to === 'wleancloud'"
      class="custom-block warning"
    >
      <p class="custom-block-title">{{ i18n.tip }}</p>

      <p v-text="i18n.tip" />
    </div>

    <div v-else>
      <textarea v-model="source" :placeholder="i18n.placeholder"></textarea>

      <button type="submit" @click.prevent="click">{{ i18n.convert }}</button>
    </div>
  </form>
</template>

<style lang="scss" scoped>
textarea {
  width: 100%;
  height: 200px;
  border: 1px solid var(--vp-c-border);
  border-radius: 3px;
  padding: 10px;
  outline: none;
}

select {
  padding: 4px 8px;
  font-size: 0.8em;
  border: 1px solid var(--vp-c-border);
  border-radius: 4px;
  outline: none;
}

button {
  font-size: 17px;
  line-height: 2em;
  padding: 0 20px;
  border: none;
  background: var(--vp-c-accent-bg);
  color: var(--vp-c-white);
  border-radius: 3px;
  cursor: pointer;
}

.selector {
  margin-bottom: 20px;
}

.input-group {
  display: inline-block;
  font-size: 20px;
}
</style>
