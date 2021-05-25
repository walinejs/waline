<template>
  <div class="vcomment">
    <CloseIcon
      v-if="replyId"
      size="24"
      class="vclose"
      :title="locale.cancelReply"
      role="button"
      @click="onCancelReply"
    />

    <div v-if="config.login !== 'disable'" class="vlogin">
      <div v-if="userInfo?.token" class="vlogin-info">
        <div class="vavatar">
          <button class="vlogout-btn" :title="locale.logout" @click="onLogout">
            <CloseIcon size="14" />
          </button>

          <img
            :src="
              userInfo.avatar ||
              `${config.avatarCDN}${userInfo.mailMd5}${config.avatarParam}`
            "
            alt="avatar"
          />
        </div>
        <a
          href="#"
          class="vlogin-nick"
          aria-label="Profile"
          @click="onProfile"
          v-text="userInfo.display_name"
        />
      </div>
      <a
        v-else
        class="vlogin-btn"
        role="button"
        @click="onLogin"
        v-text="locale.login"
      />
    </div>

    <div class="vpanel">
      <div
        v-if="(!userInfo || !userInfo.token) && config.login !== 'force'"
        :class="['vheader', `vheader-${config.meta.length}`]"
      >
        <div v-for="kind in config.meta" class="vheader-item" :key="kind">
          <label :for="kind" v-text="locale[kind]" />
          <input
            :ref="
              (element) => {
                if (element) inputRefs[kind] = element;
              }
            "
            :id="kind"
            :class="['vinput', `v${kind}`]"
            :name="kind"
            :type="kind === 'mail' ? 'email' : 'text'"
            v-model="inputs[kind]"
          />
        </div>
      </div>

      <textarea
        class="veditor"
        ref="editorRef"
        id="vedit"
        :placeholder="replyUser ? `@${replyUser}` : locale.placeholder"
        v-model="inputs.editor"
        @keydown="onKeyDown"
        @drop="onDrop"
        @paste="onPaste"
      />

      <div
        class="vpreview"
        :style="{ display: showPreview ? 'block' : 'none' }"
      >
        <h4>{{ locale.preview }}:</h4>
        <div class="vcontent" v-html="previewText" />
      </div>

      <div class="vfooter">
        <div class="vactions">
          <a
            href="https://guides.github.com/features/mastering-markdown/"
            title="Markdown Guide"
            aria-label="Markdown is supported"
            class="vaction"
            target="_blank"
            rel="noreferrer"
          >
            <MarkdownIcon />
          </a>

          <button
            class="vaction"
            :class="{ actived: showEmoji }"
            :title="locale.emoji"
            :aria-label="locale.emoji"
            @click="showEmoji = !showEmoji"
          >
            <EmojiIcon />
          </button>

          <label
            for="image-upload"
            class="vaction"
            :title="locale.uploadImage"
            :aria-label="locale.uploadImage"
          >
            <ImageIcon />

            <input
              ref="imageUploadRef"
              class="upload"
              id="image-upload"
              type="file"
              accept=".png,.jpg,.jpeg,.webp,.bmp,.gif"
              @change="onChange"
            />
          </label>

          <button
            class="vaction"
            :class="{ actived: showPreview }"
            :title="locale.preview"
            :aria-label="locale.preview"
            @click="showPreview = !showPreview"
          >
            <PreviewIcon />
          </button>
        </div>

        <div class="vinfo">
          <div class="vtext-number">
            {{ wordNumber }}

            <span v-if="config.wordLimit">
              &nbsp;/&nbsp;
              <span
                :class="{ illegal: !isWordNumberLegal }"
                v-text="textLimit"
              />
            </span>

            &nbsp;{{ locale.word }}
          </div>

          <button
            class="vbtn"
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

        <div v-if="showEmoji" class="vemoji-popup">
          <template v-for="(config, index) in emoji.tabs" :key="config.name">
            <div v-if="index === emojiTabIndex" class="vtab-wrapper">
              <button
                v-for="key in config.items"
                :key="key"
                :title="key"
                :aria-label="key"
                @click="insert(`:${key}:`)"
              >
                <img
                  class="vemoji"
                  :src="emoji.map[key]"
                  :alt="key"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </button>
            </div>
          </template>
          <div v-if="emoji.tabs.length > 1" class="vtabs">
            <button
              v-for="(config, index) in emoji.tabs"
              :key="config.name"
              class="vtab"
              :class="{ active: emojiTabIndex === index }"
              @click="emojiTabIndex = index"
            >
              <img
                class="vemoji"
                :src="config.icon"
                :alt="config.name"
                :title="config.name"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, inject, reactive, ref, watch } from 'vue';
import autosize from 'autosize';

import {
  CloseIcon,
  EmojiIcon,
  ImageIcon,
  MarkdownIcon,
  PreviewIcon,
  LoadingIcon,
} from './Icons';
import { useUserInfo } from '../composables';
import {
  getImagefromDataTransfer,
  parseMarkdown,
  getWordNumber,
  parseEmoji,
  postComment,
  store,
} from '../utils';

import type { EmojiConfig } from '../config';
import type { CommentData, ConfigRef } from '../typings';

export default defineComponent({
  name: 'CommentBox',

  components: {
    CloseIcon,
    EmojiIcon,
    ImageIcon,
    MarkdownIcon,
    PreviewIcon,
    LoadingIcon,
  },

  props: {
    rootId: {
      type: String,
      default: '',
    },
    replyId: {
      type: String,
      default: '',
    },
    replyUser: {
      type: String,
      default: '',
    },
  },

  emits: ['submit', 'cancel-reply'],

  setup(props, { emit }) {
    const config = inject<ConfigRef>('config') as ConfigRef;

    const { userInfo, setUserInfo } = useUserInfo();

    const inputs = reactive({
      nick: store.getItem('nick') || '',
      mail: store.getItem('mail') || '',
      link: store.getItem('link') || '',
      editor: '',
    });

    const inputRefs = ref<Record<string, HTMLInputElement>>({});
    const editorRef = ref<HTMLTextAreaElement | null>(null);
    const imageUploadRef = ref<HTMLInputElement | null>(null);

    const emoji = ref<EmojiConfig>({ tabs: [], map: {} });
    const emojiTabIndex = ref(0);
    const showEmoji = ref(false);
    const showPreview = ref(false);
    const previewText = ref('');
    const wordNumber = ref(0);

    const wordLimit = ref(0);
    const isWordNumberLegal = ref(false);

    const content = ref('');

    const isSubmitting = ref(false);

    const locale = computed(() => config.value.locale);

    const insert = (content: string): void => {
      const textArea = editorRef.value as HTMLTextAreaElement;
      const startPosition = textArea.selectionStart;
      const endPosition = textArea.selectionEnd || 0;
      const scrollTop = textArea.scrollTop;

      inputs.editor =
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
      if ((event.ctrlKey || event.metaKey) && key === 'Enter') submitComment();

      // tab key
      if (key === 'Tab') {
        event.preventDefault();
        insert('    ');
      }
    };

    const uploadImage = (file: File): Promise<void> => {
      const uploadText = `![${config.value.locale.uploading} ${file.name}]()`;

      insert(uploadText);

      return Promise.resolve()
        .then(() => config.value.uploadImage(file))
        .then((url) => {
          inputs.editor = inputs.editor.replace(
            uploadText,
            `\r\n![${file.name}](${url})`
          );
        });
    };

    const onDrop = (event: DragEvent): void => {
      if (event.dataTransfer?.items) {
        const file = getImagefromDataTransfer(event.dataTransfer.items);

        if (file) {
          uploadImage(file);
          event.preventDefault();
        }
      }
    };

    const onPaste = (event: ClipboardEvent): void => {
      if (event.clipboardData) {
        const file = getImagefromDataTransfer(event.clipboardData.items);

        if (file) uploadImage(file);
      }
    };

    const onChange = (): void => {
      const inputElement = imageUploadRef.value as HTMLInputElement;

      if (inputElement.files)
        uploadImage(inputElement.files[0]).then(() => {
          // clear input so a same image can be uploaded later
          inputElement.value = '';
        });
    };

    const submitComment = (): void => {
      const { serverURL, lang, login, wordLimit, requiredMeta } = config.value;

      const comment: CommentData = {
        comment: content.value,
        nick: inputs.nick,
        mail: inputs.mail,
        link: inputs.link,
        ua: navigator.userAgent,
        url: config.value.path,
      };

      if (userInfo.value?.token) {
        // login user

        comment.nick = userInfo.value.display_name;
        comment.mail = userInfo.value.email;
        comment.link = userInfo.value.url;
      } else {
        if (login === 'force') return;

        // check nick
        if (
          (requiredMeta.indexOf('nick') > -1 || comment.nick) &&
          comment.nick.length < 3
        ) {
          inputRefs.value.nick?.focus();
          return alert(locale.value.nickError);
        }

        // check mail
        if (
          (requiredMeta.indexOf('mail') > -1 || comment.mail) &&
          !/^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.exec(comment.mail)
        ) {
          inputRefs.value.mail?.focus();
          return alert(locale.value.mailError);
        }

        // check comment
        if (!comment.comment) {
          editorRef.value?.focus();
          return;
        }

        comment.nick = comment.nick || 'Anonymous';
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

      postComment({
        serverURL,
        lang,
        token: userInfo.value?.token,
        comment,
      }).then(
        (resp) => {
          isSubmitting.value = false;

          store.setItem({
            nick: comment.nick,
            link: comment.link,
            mail: comment.mail,
          });

          if (resp.errmsg) return alert(resp.errmsg);

          emit('submit', resp.data);

          inputs.editor = '';

          previewText.value = '';

          if (props.replyId) emit('cancel-reply');
        },
        () => {
          isSubmitting.value = false;
        }
      );
    };

    const onLogin = (event: Event): void => {
      event.preventDefault();
      const { lang, serverURL } = config.value;

      const width = 450;
      const height = 450;
      const left = (window.innerWidth - width) / 2;
      const top = (window.innerHeight - height) / 2;

      const handler = window.open(
        `${serverURL}/ui/login?lng=${encodeURIComponent(lang)}`,
        '_blank',
        `width=${width},height=${height},left=${left},top=${top},scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no`
      );

      handler?.postMessage({ type: 'TOKEN', data: null }, '*');
      window.addEventListener('message', ({ data }) => {
        if (!data || data.type !== 'userInfo') return;

        if (data.data.token) {
          handler?.close();
          setUserInfo(data.data);
          (data.data.remember ? localStorage : sessionStorage).setItem(
            'WALINE_USER',
            JSON.stringify(data.data)
          );
        }
      });
    };

    const onLogout = (): void => {
      setUserInfo(null);
      localStorage.setItem('WALINE_USER', 'null');
      sessionStorage.setItem('WALINE_USER', 'null');
    };

    const onProfile = (event: Event): void => {
      event.preventDefault();

      const { lang, serverURL } = config.value;

      const width = 800;
      const height = 800;
      const left = (window.innerWidth - width) / 2;
      const top = (window.innerHeight - height) / 2;
      const handler = window.open(
        `${serverURL}/ui/profile?lng=${encodeURIComponent(lang)}`,
        '_blank',
        `width=${width},height=${height},left=${left},top=${top},scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no`
      );

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      handler?.postMessage({ type: 'TOKEN', data: userInfo.value!.token }, '*');

      window.addEventListener('message', ({ data }) => {
        if (!data || data.type !== 'profile') return;

        setUserInfo({ ...userInfo.value, ...data });
        [localStorage, sessionStorage]
          .filter((store) => store.getItem('WALINE_USER'))
          .forEach((store) =>
            store.setItem('WALINE_USER', JSON.stringify(userInfo))
          );
      });
    };

    // initial set of emoji
    config.value.emoji.then((emojiConfig) => {
      emoji.value = emojiConfig;
    });

    // watch editor
    watch(
      () => inputs.editor,
      (value) => {
        const { highlight } = config.value;

        content.value = value;
        previewText.value = parseMarkdown(value, highlight, emoji.value.map);
        wordNumber.value = getWordNumber(value);

        if (editorRef.value)
          if (value) autosize(editorRef.value);
          else autosize.destroy(editorRef.value);
      }
    );

    // watch emoji value change
    watch(
      () => config.value.emoji,
      (emojiConfig) =>
        emojiConfig.then((config) => {
          emoji.value = config;
        })
    );

    // update wordNumber
    watch([config, wordNumber], ([config, wordNumber]) => {
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
    });

    return {
      // config
      config,
      locale,

      // events
      insert,
      onChange,
      onDrop,
      onKeyDown,
      onPaste,
      onLogin,
      onLogout,
      onProfile,
      submitComment,

      userInfo,
      isSubmitting,

      // word
      wordNumber,
      wordLimit,
      isWordNumberLegal,

      // inputs
      inputs,

      // emoji
      emoji,
      emojiTabIndex,
      showEmoji,

      // preview
      previewText,
      showPreview,

      // ref
      inputRefs,
      editorRef,
      imageUploadRef,
    };
  },
});
</script>
