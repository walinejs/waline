<template>
  <div class="wl-comment">
    <div
      v-if="config.login !== 'disable' && isLogin && !edit?.objectId"
      class="wl-login-info"
    >
      <div class="wl-avatar">
        <button
          type="submit"
          class="wl-logout-btn"
          :title="locale.logout"
          @click="onLogout"
        >
          <CloseIcon :size="14" />
        </button>

        <a
          href="#"
          class="wl-login-nick"
          aria-label="Profile"
          :title="locale.profile"
          @click="onProfile"
        >
          <img :src="userInfo.avatar" alt="avatar" />
        </a>
      </div>

      <a
        href="#"
        class="wl-login-nick"
        aria-label="Profile"
        :title="locale.profile"
        @click="onProfile"
        v-text="userInfo.display_name"
      />
    </div>

    <div class="wl-panel">
      <div
        v-if="config.login !== 'force' && config.meta.length && !isLogin"
        class="wl-header"
        :class="`item${config.meta.length}`"
      >
        <div v-for="kind in config.meta" :key="kind" class="wl-header-item">
          <label
            :for="`wl-${kind}`"
            v-text="
              locale[kind] +
              (config.requiredMeta.includes(kind) || !config.requiredMeta.length
                ? ''
                : `(${locale.optional})`)
            "
          />

          <input
            :id="`wl-${kind}`"
            :ref="
              (element) => {
                if (element) inputRefs[kind] = element as HTMLInputElement;
              }
            "
            v-model="userMeta[kind]"
            class="wl-input"
            :class="`wl-${kind}`"
            :name="kind"
            :type="kind === 'mail' ? 'email' : 'text'"
          />
        </div>
      </div>

      <textarea
        id="wl-edit"
        ref="editorRef"
        v-model="editor"
        class="wl-editor"
        :placeholder="replyUser ? `@${replyUser}` : locale.placeholder"
        @keydown="onKeyDown"
        @drop="onDrop"
        @paste="onPaste"
      />

      <div v-show="showPreview" class="wl-preview">
        <hr />

        <h4>{{ locale.preview }}:</h4>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div class="wl-content" v-html="previewText" />
      </div>

      <div class="wl-footer">
        <div class="wl-actions">
          <a
            href="https://guides.github.com/features/mastering-markdown/"
            title="Markdown Guide"
            aria-label="Markdown is supported"
            class="wl-action"
            target="_blank"
            rel="noopener noreferrer"
          >
            <MarkdownIcon />
          </a>

          <button
            v-show="emoji.tabs.length"
            ref="emojiButtonRef"
            type="button"
            class="wl-action"
            :class="{ active: showEmoji }"
            :title="locale.emoji"
            @click="showEmoji = !showEmoji"
          >
            <EmojiIcon />
          </button>

          <button
            v-if="config.search"
            ref="gifButtonRef"
            type="button"
            class="wl-action"
            :class="{ active: showGif }"
            :title="locale.gif"
            @click="showGif = !showGif"
          >
            <GifIcon />
          </button>

          <input
            id="wl-image-upload"
            ref="imageUploadRef"
            class="upload"
            type="file"
            accept=".png,.jpg,.jpeg,.webp,.bmp,.gif"
            @change="onChange"
          />

          <label
            v-if="canUploadImage"
            for="wl-image-upload"
            class="wl-action"
            :title="locale.uploadImage"
          >
            <ImageIcon />
          </label>

          <button
            type="button"
            class="wl-action"
            :class="{ active: showPreview }"
            :title="locale.preview"
            @click="showPreview = !showPreview"
          >
            <PreviewIcon />
          </button>
        </div>

        <div class="wl-info">
          <div class="wl-captcha-container"></div>

          <div class="wl-text-number">
            {{ wordNumber }}

            <span v-if="config.wordLimit">
              &nbsp;/&nbsp;
              <span
                :class="{ illegal: !isWordNumberLegal }"
                v-text="wordLimit"
              />
            </span>

            &nbsp;{{ locale.word }}
          </div>

          <button
            v-if="config.login !== 'disable' && !isLogin"
            type="button"
            class="wl-btn"
            @click="onLogin"
            v-text="locale.login"
          />

          <button
            v-if="config.login !== 'force' || isLogin"
            type="submit"
            class="primary wl-btn"
            title="Cmd|Ctrl + Enter"
            :disabled="isSubmitting"
            @click="submitComment"
          >
            <LoadingIcon v-if="isSubmitting" :size="16" />

            <template v-else>
              {{ locale.submit }}
            </template>
          </button>
        </div>

        <div
          ref="gifPopupRef"
          class="wl-gif-popup"
          :class="{ display: showGif }"
        >
          <input
            ref="gifSearchInputRef"
            type="text"
            :placeholder="locale.gifSearchPlaceholder"
            @input="onGifSearch"
          />

          <ImageWall
            v-if="searchResults.list.length"
            :items="searchResults.list"
            :column-width="200"
            :gap="6"
            @insert="insert($event)"
            @scroll="onImageWallScroll"
          >
          </ImageWall>

          <div v-if="searchResults.loading" class="wl-loading">
            <LoadingIcon :size="30" />
          </div>
        </div>

        <div
          ref="emojiPopupRef"
          class="wl-emoji-popup"
          :class="{ display: showEmoji }"
        >
          <template
            v-for="(emojiItem, index) in emoji.tabs"
            :key="emojiItem.name"
          >
            <div v-if="index === emojiTabIndex" class="wl-tab-wrapper">
              <button
                v-for="key in emojiItem.items"
                :key="key"
                type="button"
                :title="key"
                @click="insert(`:${key}:`)"
              >
                <img
                  v-if="showEmoji"
                  class="wl-emoji"
                  :src="emoji.map[key]"
                  :alt="key"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </button>
            </div>
          </template>

          <div v-if="emoji.tabs.length > 1" class="wl-tabs">
            <button
              v-for="(emojiItem, index) in emoji.tabs"
              :key="emojiItem.name"
              type="button"
              class="wl-tab"
              :class="{ active: emojiTabIndex === index }"
              @click="emojiTabIndex = index"
            >
              <img
                class="wl-emoji"
                :src="emojiItem.icon"
                :alt="emojiItem.name"
                :title="emojiItem.name"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </button>
          </div>
        </div>
      </div>
    </div>

    <button
      v-if="replyId || edit?.objectId"
      type="button"
      class="wl-close"
      :title="locale.cancelReply"
      @click="$emit(replyId ? 'cancelReply' : 'cancelEdit')"
    >
      <CloseIcon :size="24" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { useDebounceFn } from '@vueuse/core';
import autosize from 'autosize';
import {
  type ComputedRef,
  type DeepReadonly,
  computed,
  inject,
  onMounted,
  onUnmounted,
  reactive,
  ref,
  watch,
} from 'vue';

import {
  CloseIcon,
  EmojiIcon,
  GifIcon,
  ImageIcon,
  LoadingIcon,
  MarkdownIcon,
  PreviewIcon,
} from './Icons.js';
import ImageWall from './ImageWall.vue';
import { addComment, login, updateComment, UserInfo } from '../api/index.js';
import {
  useEditor,
  useReCaptcha,
  useTurnstile,
  useUserInfo,
  useUserMeta,
} from '../composables/index.js';
import {
  type WalineComment,
  type WalineCommentData,
  type WalineImageUploader,
  type WalineSearchOptions,
  type WalineSearchResult,
} from '../typings/index.js';
import {
  type WalineConfig,
  type WalineEmojiConfig,
  getEmojis,
  getImageFromDataTransfer,
  isValidEmail,
  getWordNumber,
  parseEmoji,
  parseMarkdown,
  userAgent,
} from '../utils/index.js';

const props = withDefaults(
  defineProps<{
    /**
     * Current comment to be edited
     */
    edit?: WalineComment | null;
    /**
     * Root comment id
     */
    rootId?: string;
    /**
     * Comment id to be replied
     */
    replyId?: string;
    /**
     * User name to be replied
     */
    replyUser?: string;
  }>(),
  {
    edit: null,
    rootId: '',
    replyId: '',
    replyUser: '',
  }
);

const emit = defineEmits<{
  (event: 'log'): void;
  (event: 'cancelEdit'): void;
  (event: 'cancelReply'): void;
  (event: 'submit', comment: WalineComment): void;
}>();

defineExpose();

const config = inject<ComputedRef<WalineConfig>>('config')!;

const editor = useEditor();
const userMeta = useUserMeta();
const userInfo = useUserInfo();

const inputRefs = ref<Record<string, HTMLInputElement>>({});
const editorRef = ref<HTMLTextAreaElement | null>(null);
const imageUploadRef = ref<HTMLInputElement | null>(null);
const emojiButtonRef = ref<HTMLDivElement | null>(null);
const emojiPopupRef = ref<HTMLDivElement | null>(null);
const gifButtonRef = ref<HTMLDivElement | null>(null);
const gifPopupRef = ref<HTMLDivElement | null>(null);
const gifSearchInputRef = ref<HTMLInputElement | null>(null);

const emoji = ref<DeepReadonly<WalineEmojiConfig>>({ tabs: [], map: {} });
const emojiTabIndex = ref(0);
const showEmoji = ref(false);
const showGif = ref(false);
const showPreview = ref(false);
const previewText = ref('');
const wordNumber = ref(0);

const searchResults = reactive({
  loading: true,
  list: [] as WalineSearchResult,
});

const wordLimit = ref(0);
const isWordNumberLegal = ref(false);

const content = ref('');

const isSubmitting = ref(false);

const isImageListEnd = ref(false);

const locale = computed(() => config.value.locale);

const isLogin = computed(() => Boolean(userInfo.value?.token));

const canUploadImage = computed(() => config.value.imageUploader !== false);

const insert = (content: string): void => {
  const textArea = editorRef.value!;
  const startPosition = textArea.selectionStart;
  const endPosition = textArea.selectionEnd || 0;
  const scrollTop = textArea.scrollTop;

  editor.value =
    textArea.value.substring(0, startPosition) +
    content +
    textArea.value.substring(endPosition, textArea.value.length);
  textArea.focus();
  textArea.selectionStart = startPosition + content.length;
  textArea.selectionEnd = startPosition + content.length;
  textArea.scrollTop = scrollTop;
};

const onKeyDown = (event: KeyboardEvent): void => {
  const key = event.key;

  // Shortcut key
  if ((event.ctrlKey || event.metaKey) && key === 'Enter') void submitComment();
};

const uploadImage = (file: File): Promise<void> => {
  const uploadText = `![${config.value.locale.uploading} ${file.name}]()`;

  insert(uploadText);

  return Promise.resolve()
    .then(() => (config.value.imageUploader as WalineImageUploader)(file))
    .then((url) => {
      editor.value = editor.value.replace(
        uploadText,
        `\r\n![${file.name}](${url})`
      );
    })
    .catch((err: Error) => {
      alert(err.message);
      editor.value = editor.value.replace(uploadText, '');
    });
};

const onDrop = (event: DragEvent): void => {
  if (event.dataTransfer?.items) {
    const file = getImageFromDataTransfer(event.dataTransfer.items);

    if (file && canUploadImage.value) {
      void uploadImage(file);
      event.preventDefault();
    }
  }
};

const onPaste = (event: ClipboardEvent): void => {
  if (event.clipboardData) {
    const file = getImageFromDataTransfer(event.clipboardData.items);

    if (file && canUploadImage.value) void uploadImage(file);
  }
};

const onChange = (): void => {
  const inputElement = imageUploadRef.value!;

  if (inputElement.files && canUploadImage.value)
    void uploadImage(inputElement.files[0]).then(() => {
      // clear input so a same image can be uploaded later
      inputElement.value = '';
    });
};

const submitComment = async (): Promise<void> => {
  const {
    serverURL,
    lang,
    login,
    wordLimit,
    requiredMeta,
    recaptchaV3Key,
    turnstileKey,
  } = config.value;

  const ua = await userAgent();
  const comment: WalineCommentData = {
    comment: content.value,
    nick: userMeta.value.nick,
    mail: userMeta.value.mail,
    link: userMeta.value.link,
    url: config.value.path,
    ua,
  };

  if (userInfo.value?.token) {
    // login user

    comment.nick = userInfo.value.display_name;
    comment.mail = userInfo.value.email;
    comment.link = userInfo.value.url;
  } else {
    if (login === 'force') return;

    // check nick
    if (requiredMeta.indexOf('nick') > -1 && !comment.nick) {
      inputRefs.value.nick?.focus();

      return alert(locale.value.nickError);
    }

    // check mail
    if (
      (requiredMeta.indexOf('mail') > -1 && !comment.mail) ||
      (comment.mail && !isValidEmail(comment.mail))
    ) {
      inputRefs.value.mail?.focus();

      return alert(locale.value.mailError);
    }

    if (!comment.nick) comment.nick = locale.value.anonymous;
  }

  // check comment
  if (!comment.comment) {
    editorRef.value?.focus();

    return;
  }

  if (!isWordNumberLegal.value)
    return alert(
      locale.value.wordHint
        .replace('$0', (wordLimit as [number, number])[0].toString())
        .replace('$1', (wordLimit as [number, number])[1].toString())
        .replace('$2', wordNumber.value.toString())
    );

  comment.comment = parseEmoji(comment.comment, emoji.value.map);

  if (props.replyId && props.rootId) {
    comment.pid = props.replyId;
    comment.rid = props.rootId;
    comment.at = props.replyUser;
  }

  isSubmitting.value = true;

  try {
    if (recaptchaV3Key)
      comment.recaptchaV3 = await useReCaptcha(recaptchaV3Key).execute(
        'social'
      );

    if (turnstileKey)
      comment.turnstile = await useTurnstile(turnstileKey).execute('social');

    const options = {
      serverURL,
      lang,
      token: userInfo.value?.token,
      comment,
    };

    const resp = await (props.edit
      ? updateComment({
          objectId: props.edit.objectId,
          ...options,
        })
      : addComment(options));

    isSubmitting.value = false;

    if (resp.errmsg) return alert(resp.errmsg);

    emit('submit', resp.data!);

    editor.value = '';

    previewText.value = '';

    if (props.replyId) emit('cancelReply');
    if (props.edit?.objectId) emit('cancelEdit');
  } catch (err: unknown) {
    isSubmitting.value = false;

    alert((err as TypeError).message);
  }
};

const onLogin = (event: Event): void => {
  event.preventDefault();
  const { lang, serverURL } = config.value;

  void login({
    serverURL,
    lang,
  }).then((data) => {
    userInfo.value = data;
    (data.remember ? localStorage : sessionStorage).setItem(
      'WALINE_USER',
      JSON.stringify(data)
    );
    emit('log');
  });
};

const onLogout = (): void => {
  userInfo.value = {};
  localStorage.setItem('WALINE_USER', 'null');
  sessionStorage.setItem('WALINE_USER', 'null');
  emit('log');
};

const onProfile = (event: Event): void => {
  event.preventDefault();

  const { lang, serverURL } = config.value;

  const width = 800;
  const height = 800;
  const left = (window.innerWidth - width) / 2;
  const top = (window.innerHeight - height) / 2;
  const query = new URLSearchParams({
    lng: lang,
    token: userInfo.value.token,
  });
  const handler = window.open(
    `${serverURL}/ui/profile?${query.toString()}`,
    '_blank',
    `width=${width},height=${height},left=${left},top=${top},scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no`
  );

  handler?.postMessage({ type: 'TOKEN', data: userInfo.value.token }, '*');
};

const popupHandler = (event: MouseEvent): void => {
  if (
    !emojiButtonRef.value?.contains(event.target as Node) &&
    !emojiPopupRef.value?.contains(event.target as Node)
  )
    showEmoji.value = false;

  if (
    !gifButtonRef.value?.contains(event.target as Node) &&
    !gifPopupRef.value?.contains(event.target as Node)
  )
    showGif.value = false;
};

const onImageWallScroll = async (event: Event): Promise<void> => {
  const { scrollTop, clientHeight, scrollHeight } =
    event.target as HTMLDivElement;
  const percent = (clientHeight + scrollTop) / scrollHeight;
  const searchOptions = config.value.search as WalineSearchOptions;
  const keyword = gifSearchInputRef.value?.value || '';

  if (percent < 0.9 || searchResults.loading || isImageListEnd.value) return;

  searchResults.loading = true;

  const searchResult =
    searchOptions.more && searchResults.list.length
      ? await searchOptions.more(keyword, searchResults.list.length)
      : await searchOptions.search(keyword);

  if (searchResult.length)
    searchResults.list = [
      ...searchResults.list,
      ...(searchOptions.more && searchResults.list.length
        ? await searchOptions.more(keyword, searchResults.list.length)
        : await searchOptions.search(keyword)),
    ];
  else isImageListEnd.value = true;

  searchResults.loading = false;

  setTimeout(() => {
    (event.target as HTMLDivElement).scrollTop = scrollTop;
  }, 50);
};

const onGifSearch = useDebounceFn((event: Event) => {
  searchResults.list = [];
  isImageListEnd.value = false;
  void onImageWallScroll(event);
}, 300);

// update wordNumber
watch(
  [config, wordNumber],
  ([config, wordNumber]) => {
    const { wordLimit: limit } = config;

    if (limit) {
      if (wordNumber < limit[0] && limit[0] !== 0) {
        wordLimit.value = limit[0];
        isWordNumberLegal.value = false;
      } else if (wordNumber > limit[1]) {
        wordLimit.value = limit[1];
        isWordNumberLegal.value = false;
      } else {
        wordLimit.value = limit[1];
        isWordNumberLegal.value = true;
      }
    } else {
      wordLimit.value = 0;
      isWordNumberLegal.value = true;
    }
  },
  { immediate: true }
);

const onMessageReceive = ({
  data,
}: {
  data: { type: 'profile'; data: UserInfo };
}): void => {
  if (!data || data.type !== 'profile') return;

  userInfo.value = { ...userInfo.value, ...data.data };

  [localStorage, sessionStorage]
    .filter((store) => store.getItem('WALINE_USER'))
    .forEach((store) => store.setItem('WALINE_USER', JSON.stringify(userInfo)));
};

onMounted(() => {
  document.body.addEventListener('click', popupHandler);
  window.addEventListener('message', onMessageReceive);
  if (props.edit?.objectId) {
    editor.value = props.edit.orig;
  }

  // watch gif
  watch(showGif, async (showGif) => {
    if (!showGif) return;

    const searchOptions = config.value.search as WalineSearchOptions;

    // clear input
    if (gifSearchInputRef.value) gifSearchInputRef.value.value = '';

    searchResults.loading = true;

    searchResults.list = searchOptions.default
      ? await searchOptions.default()
      : await searchOptions.search('');

    searchResults.loading = false;
  });

  // watch editor
  watch(
    () => editor.value,
    (value) => {
      const { highlighter, texRenderer } = config.value;

      content.value = value;
      previewText.value = parseMarkdown(value, {
        emojiMap: emoji.value.map,
        highlighter,
        texRenderer,
      });
      wordNumber.value = getWordNumber(value);

      if (value) autosize(editorRef.value!);
      else autosize.destroy(editorRef.value!);
    },
    { immediate: true }
  );

  // watch emoji value change
  watch(
    () => config.value.emoji,
    (emojiConfig) =>
      getEmojis(emojiConfig).then((config) => {
        emoji.value = config;
      }),
    { immediate: true }
  );
});

onUnmounted(() => {
  document.body.removeEventListener('click', popupHandler);
  window.removeEventListener('message', onMessageReceive);
});
</script>
