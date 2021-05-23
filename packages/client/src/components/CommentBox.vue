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
        @keyDown="onKeyDown"
        @paste="onPaste"
        @input="onEditorChange($event.target)"
      />

      <div
        class="vpreview"
        :style="{ display: showPreview ? 'block' : 'none' }"
      >
        <h4>{{ locale.preview }}:</h4>
        <div class="vcontent" v-html="previewText" />
      </div>

      <div class="vfooter">
        <div class="vaction">
          <a
            href="https://guides.github.com/features/mastering-markdown/"
            title="Markdown Guide"
            aria-label="Markdown is supported"
            class="vicon"
            target="_blank"
            rel="noreferrer"
          >
            <MarkdownIcon />
          </a>

          <span
            :class="{ vicon: true, actived: showEmoji }"
            role="button"
            tabindex="0"
            :title="locale.emoji"
            :aria-label="locale.emoji"
            @click="showEmoji = !showEmoji"
          >
            <EmojiIcon />
          </span>

          <span
            :class="{ vicon: true, actived: showPreview }"
            role="button"
            tabindex="0"
            :title="locale.preview"
            :aria-label="locale.preview"
            @click="showPreview = !showPreview"
          >
            <PreviewIcon />
          </span>
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

        <div v-if="showEmoji" class="vemoji-wrapper">
          <i
            v-for="(item, key) in config.emojiMaps"
            :key="key"
            :title="key"
            role="button"
            @click="insertAtCursor(editorRef, `:${key}:`)"
          >
            <img
              class="vemoji"
              :src="
                /^(?:https?:)?\/\//u.test(item)
                  ? item
                  : `${config.emojiCDN}${item}`
              "
              :alt="key"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          </i>
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
  MarkdownIcon,
  PreviewIcon,
  LoadingIcon,
} from './Icons';
import { useUserInfo } from '../composables';
import {
  parseMarkdown,
  getWordNumber,
  insertAtCursor,
  parseEmoji,
  postComment,
  store,
} from '../utils';

import type { CommentData, ConfigRef } from '../typings';

export default defineComponent({
  name: 'CommentBox',

  components: {
    CloseIcon,
    EmojiIcon,
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
    const editorRef = ref<HTMLElement | null>(null);

    const showEmoji = ref(false);
    const showPreview = ref(false);
    const previewText = ref('');
    const wordNumber = ref(0);

    const wordLimit = ref(0);
    const isWordNumberLegal = ref(false);

    const content = ref('');

    const isSubmitting = ref(false);

    const locale = computed(() => config.value.locale);

    const onEditorChange = (textArea: HTMLTextAreaElement): void => {
      const comment = textArea.value;

      content.value = comment;
      previewText.value = parseMarkdown(comment, config.value);
      wordNumber.value = getWordNumber(comment);

      if (comment) autosize(textArea);
      else autosize.destroy(textArea);
    };

    const insert = (textArea: HTMLTextAreaElement, content: string): void => {
      insertAtCursor(textArea, content);
      onEditorChange(textArea);
    };

    const onKeyDown = (event: KeyboardEvent): void => {
      const key = event.key;

      // Shortcut key
      if (event.ctrlKey || (event.metaKey && key === 'Enter')) submitComment();

      // tab key
      if (key === 'Tab') {
        event.preventDefault();
        insert(event.target as HTMLTextAreaElement, '    ');
      }
    };

    const onPaste = (event: ClipboardEvent): void => {
      const { clipboardData, target } = event;
      const files: File[] = [];

      if (clipboardData) {
        const { items } = clipboardData;

        if (items && items.length) {
          // 检索剪切板 items
          for (let i = 0; i < items.length; i++) {
            if (items[i].type.indexOf('image') !== -1) {
              files.push(items[i].getAsFile() as File);
              break;
            }
          }
        }
      }

      if (files.length) {
        files.forEach((file) => {
          const uploadText = `![${config.value.locale.uploading} ${file['name']}]()`;

          insert(target as HTMLTextAreaElement, uploadText);

          void Promise.resolve()
            .then(() => config.value.uploadImage(file))
            .then((url) => {
              inputs.editor = inputs.editor.replace(
                uploadText,
                `\r\n![${file.name}](${url})`
              );
              onEditorChange(target as HTMLTextAreaElement);
            });
        });
      }
    };

    const submitComment = (): void => {
      const {
        serverURL,
        lang,
        emojiCDN,
        emojiMaps,
        login,
        wordLimit,
        requiredMeta,
      } = config.value;

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

      comment.comment = parseEmoji(comment.comment, emojiMaps, emojiCDN);

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
      insertAtCursor,
      onEditorChange,
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
      showEmoji,

      // preview
      previewText,
      showPreview,

      // ref
      inputRefs,
      editorRef,
    };
  },
});
</script>
