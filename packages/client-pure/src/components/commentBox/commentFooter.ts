import { addEventListener, getConfig, h } from '../../utils';
import { emojiIcon, imageIcon, markdownIcon } from '../icons';

import type { CommentBoxState } from './state';
import type { CommentEditorUploadImage } from './commentEditor';
import type { UserInfo } from '../../utils';

export const COMMENT_FOOTER_UPDATE_WORD = 'uw';

/*
 * Component Type
 */
export interface CommentFooter {
  el: HTMLDivElement;
  [COMMENT_FOOTER_UPDATE_WORD]: (
    wordNumber: number,
    currentWordLimit: number,
    isWordNumberLegal: boolean
  ) => void;
}

/**
 * Comment Box Footer
 */
export const commentFooter = (
  state: CommentBoxState,
  upload: CommentEditorUploadImage,
  togglePreview: () => void
): CommentFooter => {
  /*
   * internalData
   */
  const { locale, uploadImage, wordLimit, lang, serverURL } = getConfig();
  const canUploadImage = uploadImage !== false;

  let showEmoji = false;

  /*
   * DOM
   */

  /** Emoji Button */
  const emojiButton = h<HTMLButtonElement>(
    'button',
    { class: 'wl-action', title: locale.emoji },
    emojiIcon()
  );

  /** Emoji Popup */
  const emojiPopup = h<HTMLDivElement>('div', {});

  /** Image Uplaod Input */
  const imageUploadInput = h<HTMLInputElement>('input', {
    class: 'upload',
    id: 'wl-image-upload',
    type: 'file',
    accept: '.png,.jpg,.jpeg,.webp,.bmp,.gif',
  });

  /** Preview Button */
  const previewButton = h<HTMLButtonElement>('buton', {
    class: 'wl-action',
    title: locale.preview,
  });

  /** Word Number Info */
  const wordNumberInfo = h<HTMLDivElement>('div', {
    class: 'wl-text-number',
  });

  /** Login button */
  const loginButton = h<HTMLButtonElement>(
    'button',
    { class: 'wl-button' },
    locale.login
  );

  /** Footer */
  const footer = h<HTMLDivElement>('div', { class: 'wl-footer' }, [
    h('div', { class: 'wl-actions' }, [
      // markdown reference icon
      h(
        'a',
        {
          href: 'https://guides.github.com/features/mastering-markdown/',
          title: 'Markdown Guide',
          ariaLabel: 'Markdown is supported',
          class: 'wl-action',
          target: '_blank',
          rel: 'noreferrer',
        },
        markdownIcon()
      ),

      emojiButton,
      imageUploadInput,

      // the actual icon
      ...(canUploadImage
        ? [
            h(
              'label',
              {
                for: 'wl-image-upload',
                class: 'wl-action',
                title: locale.uploadImage,
              },
              imageIcon()
            ),
          ]
        : []),

      previewButton,

      h('div', { class: 'wl-info' }, [wordNumberInfo, loginButton]),
    ]),
  ]);

  /*
   * Events
   */
  const toggleEmojiPopup = (shouldShow = !showEmoji): void => {
    showEmoji = shouldShow;

    emojiButton.classList.toggle('active');
    emojiPopup.classList.toggle('display');
  };

  const imageUploadInputChange = (): void => {
    if (imageUploadInput.files && canUploadImage)
      void upload(imageUploadInput.files[0]).then(() => {
        // clear input so a same image can be uploaded later
        imageUploadInput.value = '';
      });
  };

  const updateWord = (
    wordNumber: number,
    currentWordLimit: number,
    isWordNumberLegal: boolean
  ): void => {
    wordNumberInfo.innerHTML = `${wordNumber}${
      wordLimit
        ? `<span>&nbsp;/&nbsp<span${
            isWordNumberLegal ? ' class="illegal' : ''
          }>${currentWordLimit}</span></span>&nbsp;${locale.word}`
        : ''
    }`;
  };

  const onLogin = (event: Event): void => {
    event.preventDefault();

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

    const receiver = ({
      data,
    }: {
      data: {
        type: string;
        token: string;
        data: UserInfo & {
          remember: boolean;
        };
      } | void;
    }): void => {
      if (!data || data.type !== 'userInfo') return;

      if (data.data.token) {
        handler?.close();
        state.userInfo = data.data;
        state.isLogin = true;
        (data.data.remember ? localStorage : sessionStorage).setItem(
          'WALINE_USER',
          JSON.stringify(data.data)
        );

        window.removeEventListener('message', receiver);
      }
    };

    window.addEventListener('message', receiver);
  };

  /*
   * Binding
   */
  addEventListener(emojiButton, 'click', () => toggleEmojiPopup());
  addEventListener(imageUploadInput, 'change', imageUploadInputChange);
  addEventListener(previewButton, 'click', () => {
    togglePreview();
    previewButton.classList.toggle('actived');
  });
  addEventListener(loginButton, 'click', onLogin);

  /*
   * Exports
   */
  return {
    el: footer,
    [COMMENT_FOOTER_UPDATE_WORD]: updateWord,
  };
};
