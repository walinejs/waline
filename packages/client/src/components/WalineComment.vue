<template>
  <div data-waline>
    <Reaction />

    <CommentBox v-if="!reply" @log="refresh" @submit="onSubmit" />

    <div class="wl-meta-head">
      <div class="wl-count">
        <span v-if="count" class="wl-num" v-text="count" />
        {{ i18n.comment }}
      </div>

      <ul class="wl-sort">
        <li
          v-for="item in sortingMethods"
          :key="item"
          :class="[item === commentSorting ? 'active' : '']"
          @click="() => onSortByChange(item)"
        >
          {{ i18n[item] }}
        </li>
      </ul>
    </div>

    <div class="wl-cards">
      <CommentCard
        v-for="comment in data"
        :key="comment.objectId"
        :root-id="comment.objectId"
        :comment="comment"
        :reply="reply"
        :edit="edit"
        @log="refresh"
        @reply="onReply"
        @edit="onEdit"
        @submit="onSubmit"
        @status="onStatusChange"
        @delete="onDelete"
        @sticky="onSticky"
        @like="onLike"
      />
    </div>

    <div v-if="status === 'error'" class="wl-operation">
      <button
        type="button"
        class="wl-btn"
        @click="refresh"
        v-text="i18n.refresh"
      />
    </div>

    <template v-else>
      <div v-if="status === 'loading'" class="wl-loading">
        <LoadingIcon :size="30" />
      </div>

      <div v-else-if="!data.length" class="wl-empty" v-text="i18n.sofa" />

      <!-- Load more button -->
      <div v-else-if="page < totalPages" class="wl-operation">
        <button
          type="button"
          class="wl-btn"
          @click="loadMore"
          v-text="i18n.more"
        />
      </div>
    </template>

    <!-- Copyright Information -->
    <div v-if="config.copyright" class="wl-power">
      Powered by
      <a
        href="https://github.com/walinejs/waline"
        target="_blank"
        rel="noopener noreferrer"
      >
        Waline
      </a>
      v{{ version }}
    </div>
  </div>
</template>

<script setup lang="ts">
/* eslint-disable vue/no-unused-properties */
import { useStyleTag } from '@vueuse/core';
import { computed, onMounted, onUnmounted, provide, ref, watch } from 'vue';
import Reaction from './ArticleReaction.vue';
import CommentBox from './CommentBox.vue';
import CommentCard from './CommentCard.vue';
import { LoadingIcon } from './Icons.js';
import { deleteComment, getComment, updateComment } from '../api/index.js';
import { useUserInfo, useLikeStorage } from '../composables/index.js';
import { getConfig, getDarkStyle } from '../utils/index.js';
import { version } from '../version.js';

import type {
  WalineComment,
  WalineCommentStatus,
  WalineLocale,
} from '../typings/index.js';

type SortKey = 'insertedAt_desc' | 'insertedAt_asc' | 'like_desc';

// TODO: Currently complex types and type imports from other files are not supported. It is possible to support type imports in the future.
// @see https://vuejs.org/api/sfc-script-setup.html#typescript-only-features
// this issue may be addressed in Vue3.3
// the following line is the same as WalineProps

type WalineCommentSorting = 'latest' | 'oldest' | 'hottest';

type WalineEmojiPresets =
  | `//${string}`
  | `http://${string}`
  | `https://${string}`;

interface WalineEmojiInfo {
  /**
   * 选项卡上的 Emoji 名称
   *
   * Emoji name show on tab
   */
  name: string;
  /**
   * 所在文件夹链接
   *
   * Current folder link
   */
  folder?: string;
  /**
   * Emoji 通用路径前缀
   *
   * Common prefix of Emoji icons
   */
  prefix?: string;
  /**
   * Emoji 图片的类型，会作为文件扩展名使用
   *
   * Type of Emoji icons, will be regarded as file extension
   */
  type?: string;
  /**
   * 选项卡显示的 Emoji 图标
   *
   * Emoji icon show on tab
   */
  icon: string;
  /**
   * Emoji 图片列表
   *
   * Emoji image list
   */
  items: string[];
}

type WalineLoginStatus = 'enable' | 'disable' | 'force';

interface WalineSearchImageData extends Record<string, unknown> {
  /**
   * 图片链接
   *
   * Image link
   */
  src: string;

  /**
   * 图片标题
   *
   * @description 用于图片的 alt 属性
   *
   * Image title
   *
   * @description Used for alt attribute of image
   */
  title?: string;

  /**
   * 图片缩略图
   *
   * @description 为了更好的加载性能，我们会优先在列表中使用此缩略图
   *
   * Image preview link
   *
   * @description For better loading performance, we will use this thumbnail first in the list
   *
   * @default src
   */
  preview?: string;
}

type WalineSearchResult = WalineSearchImageData[];

interface WalineSearchOptions {
  /**
   * 搜索操作
   *
   * Search action
   */
  search: (word: string) => Promise<WalineSearchResult>;

  /**
   * 打开列表时展示的默认结果
   *
   * Default result when opening list
   *
   * @default () => search('')
   */
  default?: () => Promise<WalineSearchResult>;

  /**
   * 获取更多的操作
   *
   * @description 会在列表滚动到底部时触发，如果你的搜索服务支持分页功能，你应该设置此项实现无限滚动
   *
   * Fetch more action
   *
   * @description It will be triggered when the list scrolls to the bottom. If your search service supports paging, you should set this to achieve infinite scrolling
   *
   * @default (word) => search(word)
   */
  more?: (word: string, currentCount: number) => Promise<WalineSearchResult>;
}

type WalineMeta = 'nick' | 'mail' | 'link';

type WalineImageUploader = (image: File) => Promise<string>;

type WalineHighlighter = (code: string, lang: string) => string;

type WalineTexRenderer = (blockMode: boolean, tex: string) => string;

const props = defineProps<{
  /**
   * Waline 的服务端地址
   *
   * Waline server address url
   */
  serverURL: string;

  /**
   * 当前 _文章页_ 路径，用于区分不同的 _文章页_ ，以保证正确读取该 _文章页_ 下的评论列表
   *
   * 你可以将其设置为 `window.location.pathname`
   *
   * Article path id. Used to distinguish different _article pages_ to ensure loading the correct comment list under the _article page_.
   *
   * You can set it to `window.location.pathname`
   */
  path: string;

  /**
   * 评论者相关属性
   *
   * `Meta` 可选值: `'nick'`, `'mail'`, `'link'`
   *
   * Reviewer attributes.
   *
   * Optional values for `Meta`: `'nick'`, `'mail'`, `'link'`
   *
   * @default ['nick', 'mail', 'link']
   */
  meta?: WalineMeta[];

  /**
   * 设置**必填项**，默认昵称为匿名
   *
   * Set required fields, default anonymous with nickname
   *
   * @default []
   */
  requiredMeta?: WalineMeta[];

  /**
   * 评论字数限制。填入单个数字时为最大字数限制
   *
   * @more 设置为 `0` 时无限制
   *
   * Comment word s limit. When a single number is filled in, it 's the maximum number of comment words.
   *
   * @more No limit when set to `0`.
   *
   * @default 0
   */
  wordLimit?: number | [number, number];

  /**
   * 评论列表分页，每页条数
   *
   * number of pages per page
   *
   * @default 10
   */
  pageSize?: number;

  /**
   * Waline 显示语言
   *
   * 可选值:
   *
   * - `'zh'`
   * - `'zh-cn'`
   * - `'zh-CN'`
   * - `'zh-tw'`
   * - `'zh-TW'`
   * - `'en'`
   * - `'en-US'`
   * - `'en-us'`
   * - `'jp'`
   * - `'jp-jp'`
   * - `'jp-JP'`
   * - `'pt-br'`
   * - `'pt-BR'`
   * - `'ru'`
   * - `'ru-ru'`
   * - `'ru-RU'`
   *
   * Display language for waline
   *
   * Optional value:
   *
   * - `'zh'`
   * - `'zh-cn'`
   * - `'zh-CN'`
   * - `'zh-tw'`
   * - `'zh-TW'`
   * - `'en'`
   * - `'en-US'`
   * - `'en-us'`
   * - `'jp'`
   * - `'jp-jp'`
   * - `'jp-JP'`
   * - `'pt-br'`
   * - `'pt-BR'`
   * - `'ru'`
   * - `'ru-ru'`
   * - `'ru-RU'`
   *
   * @default 'zh-CN'
   */
  lang?: string;

  /**
   * 自定义 waline 语言显示
   *
   * @see [自定义语言](https://waline.js.org/client/i18n.html)
   *
   * Custom display language in waline
   *
   * @see [I18n](https://waline.js.org/en/client/i18n.html)
   */
  locale?: Partial<WalineLocale>;

  /**
   * 评论列表排序方式
   *
   * Sorting method for comment list
   *
   * @default 'latest'
   */
  commentSorting?: WalineCommentSorting;

  /**
   * 是否启用暗黑模式适配
   *
   * @more 设置 `'auto'` 会根据设备暗黑模式自适应。填入 CSS 选择器会在对应选择器生效时启用夜间模式。
   *
   * Whether to enable darkmode support
   *
   * @more Setting `'auto'` will display darkmode due to device settings. Filling in CSS selector will enable darkmode only when the selector match waline ancestor nodes.
   */
  dark?: string | boolean;

  /**
   * 设置表情包
   *
   * Set Emojis
   *
   * @default ['//unpkg.com/@waline/emojis@1.1.0/weibo']
   */
  emoji?: (WalineEmojiInfo | WalineEmojiPresets)[] | boolean;

  /**
   * 设置搜索功能
   *
   * Customize Search feature
   *
   * @default true
   */
  search?: WalineSearchOptions | boolean;

  /**
   * 代码高亮
   *
   * Code highlighting
   *
   * @default true
   */

  highlighter?: WalineHighlighter | boolean;

  /**
   * 自定义图片上传方法，方便更好的存储图片
   *
   * 方法执行时会将图片对象传入。
   *
   * Custom image upload callback to manage picture by yourself.
   *
   * We will pass a picture file object when execute it.
   *
   * @default true
   */

  imageUploader?: WalineImageUploader | boolean;

  /**
   * 自定义数学公式处理方法，用于预览。
   *
   * Custom math formula parse callback for preview.
   *
   * @default true
   */
  texRenderer?: WalineTexRenderer | boolean;

  /**
   *
   * 登录模式状态，可选值:
   *
   * - `'enable'`: 启用登录 (默认)
   * - `'disable'`: 禁用登录，用户只能填写信息评论
   * - `'force'`: 强制登录，用户必须注册并登录才可发布评论
   *
   * Login mode status, optional values:
   *
   * - `'enable'`: enable login (default)
   * - `'disable'`: Login is disabled, users should fill in information to comment
   * - `'force'`: Forced login, users must login to comment
   *
   * @default 'enable'
   */
  login?: WalineLoginStatus;

  /**
   * 是否在页脚展示版权信息
   *
   * 为了支持 Waline，我们强烈建议你开启它
   *
   * Whether show copyright in footer
   *
   * We strongly recommended you to keep it on to support waline
   *
   * @default true
   */
  copyright?: boolean;

  /**
   * recaptcha v3 client key
   */
  recaptchaV3Key?: string;

  /**
   * reaction
   */
  reaction?: string[] | boolean;
}>();

const sortKeyMap: Record<WalineCommentSorting, SortKey> = {
  latest: 'insertedAt_desc',
  oldest: 'insertedAt_asc',
  hottest: 'like_desc',
};
const sortingMethods = Object.keys(sortKeyMap) as WalineCommentSorting[];

const userInfo = useUserInfo();
const likeStorage = useLikeStorage();

const status = ref<'loading' | 'success' | 'error'>('loading');

const count = ref(0);
const page = ref(1);
const totalPages = ref(0);

const config = computed(() => getConfig(props));

// eslint-disable-next-line vue/no-ref-object-destructure
const commentSorting = ref(config.value.commentSorting);

const data = ref<WalineComment[]>([]);
const reply = ref<WalineComment | null>(null);
const edit = ref<WalineComment | null>(null);

const darkmodeStyle = computed(() => getDarkStyle(config.value.dark));

const i18n = computed(() => config.value.locale);

useStyleTag(darkmodeStyle);

let abort: () => void;

const getCommentData = (pageNumber: number): void => {
  const { serverURL, path, pageSize } = config.value;
  const controller = new AbortController();

  status.value = 'loading';

  abort?.();

  getComment({
    serverURL,
    lang: config.value.lang,
    path,
    pageSize,
    sortBy: sortKeyMap[commentSorting.value],
    page: pageNumber,
    signal: controller.signal,
    token: userInfo.value?.token,
  })
    .then((resp) => {
      status.value = 'success';
      count.value = resp.count;
      data.value.push(...resp.data);
      page.value = pageNumber;
      totalPages.value = resp.totalPages;
    })
    .catch((err) => {
      if (err.name !== 'AbortError') {
        console.error(err.message);
        status.value = 'error';
      }
    });

  abort = controller.abort.bind(controller);
};

const loadMore = (): void => getCommentData(page.value + 1);

const refresh = (): void => {
  count.value = 0;
  data.value = [];
  getCommentData(1);
};

const onSortByChange = (item: WalineCommentSorting): void => {
  if (commentSorting.value !== item) {
    commentSorting.value = item;
    refresh();
  }
};

const onReply = (comment: WalineComment | null): void => {
  reply.value = comment;
};

const onEdit = (comment: WalineComment | null): void => {
  edit.value = comment;
};

const onSubmit = (comment: WalineComment): void => {
  if (edit.value) {
    edit.value.comment = comment.comment;
    edit.value.orig = comment.orig;
  } else if (comment.rid) {
    const repliedComment = data.value.find(
      ({ objectId }) => objectId === comment.rid
    );

    if (!repliedComment) return;

    if (!Array.isArray(repliedComment.children)) repliedComment.children = [];

    repliedComment.children.push(comment);
  } else data.value.unshift(comment);
};

const onStatusChange = async ({
  comment,
  status,
}: {
  comment: WalineComment;
  status: WalineCommentStatus;
}): Promise<void> => {
  if (comment.status === status) return;

  const { serverURL, lang } = config.value;

  await updateComment({
    serverURL,
    lang,
    token: userInfo.value?.token,
    objectId: comment.objectId,
    status,
  });

  comment.status = status;
};

const onSticky = async (comment: WalineComment): Promise<void> => {
  if (comment.rid) return;

  const { serverURL, lang } = config.value;

  await updateComment({
    serverURL,
    lang,
    token: userInfo.value?.token,
    objectId: comment.objectId,
    sticky: comment.sticky ? 0 : 1,
  });

  comment.sticky = !comment.sticky;
};

const onDelete = async ({ objectId }: WalineComment): Promise<void> => {
  if (!confirm('Are you sure you want to delete this comment?')) return;

  const { serverURL, lang } = config.value;

  await deleteComment({
    serverURL,
    lang,
    token: userInfo.value?.token,
    objectId: objectId,
  });

  // delete comment from data
  data.value.some((item, index) => {
    if (item.objectId === objectId) {
      data.value = data.value.filter((_item, i) => i !== index);

      return true;
    }

    return item.children.some((child, childIndex) => {
      if (child.objectId === objectId) {
        data.value[index].children = item.children.filter(
          (_item, i) => i !== childIndex
        );

        return true;
      }

      return false;
    });
  });
};

const onLike = async (comment: WalineComment): Promise<void> => {
  const { serverURL, lang } = config.value;
  const { objectId } = comment;
  const hasLiked = likeStorage.value.includes(objectId);

  await updateComment({
    serverURL,
    lang,
    objectId,
    token: userInfo.value?.token,
    like: !hasLiked,
  });

  if (hasLiked)
    likeStorage.value = likeStorage.value.filter((id) => id !== objectId);
  else {
    likeStorage.value = [...likeStorage.value, objectId];

    if (likeStorage.value.length > 50)
      likeStorage.value = likeStorage.value.slice(-50);
  }

  comment.like = (comment.like || 0) + (hasLiked ? -1 : 1);
};

provide('config', config);

onMounted(() => {
  watch(
    () => [props.serverURL, props.path],
    () => refresh(),
    { immediate: true }
  );
});
onUnmounted(() => abort?.());
</script>
