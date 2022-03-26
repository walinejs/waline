import {
  addEventListener,
  getConfig,
  getImagefromDataTransfer,
  h,
} from '../../utils';

import type { UploadImage } from '../../config';

/*
 * Event Constants
 */
export const COMMENT_EDITOR_GET_TEXT = 'g';
export const COMMENT_EDITOR_SET_PLACEHOLDER = 's';
export const COMMENT_EDITOR_UPLOAD_IMAGE = 'u';

/*
 * Component Type
 */
export type CommentEditorUploadImage = (image: File) => Promise<void>;

export interface CommentEditor {
  el: HTMLTextAreaElement;
  [COMMENT_EDITOR_GET_TEXT]: () => string;
  [COMMENT_EDITOR_SET_PLACEHOLDER]: (replyUser: string) => void;
  [COMMENT_EDITOR_UPLOAD_IMAGE]: CommentEditorUploadImage;
}

/**
 * Comment Box Editor
 */
export const commentEditor = (submitComment: () => void): CommentEditor => {
  /*
   * internalData
   */
  const { locale, uploadImage } = getConfig();
  const canUploadImage = uploadImage !== false;

  /*
   * DOM
   */
  const editor = h<HTMLTextAreaElement>('textarea', {
    class: 'wl-editor',
    id: 'wl-edit',
  });

  /*
   * Events
   */
  const insert = (content: string): void => {
    const startPosition = editor.selectionStart;
    const endPosition = editor.selectionEnd || 0;
    const scrollTop = editor.scrollTop;

    editor.value =
      editor.value.substring(0, startPosition) +
      content +
      editor.value.substring(endPosition, editor.value.length);
    editor.focus();
    editor.selectionStart = startPosition + content.length;
    editor.selectionEnd = startPosition + content.length;
    editor.scrollTop = scrollTop;
  };

  const upload = (file: File): Promise<void> => {
    const uploadText = `![${locale.uploading} ${file.name}]()`;

    insert(uploadText);

    return Promise.resolve()
      .then(() => (uploadImage as UploadImage)(file))
      .then((url) => {
        editor.value = editor.value.replace(
          uploadText,
          `\r\n![${file.name}](${url})`
        );
      });
  };

  const onKeyDown = (event: KeyboardEvent): void => {
    const key = event.key;

    // Shortcut key
    if ((event.ctrlKey || event.metaKey) && key === 'Enter') submitComment();
  };

  const onDrop = (event: DragEvent): void => {
    if (event.dataTransfer?.items) {
      const file = getImagefromDataTransfer(event.dataTransfer.items);

      if (file && canUploadImage) {
        void upload(file);
        event.preventDefault();
      }
    }
  };

  const onPaste = (event: ClipboardEvent): void => {
    if (event.clipboardData) {
      const file = getImagefromDataTransfer(event.clipboardData.items);

      if (file && canUploadImage) void upload(file);
    }
  };

  /*
   * Binding
   */
  addEventListener(editor, 'keydown', onKeyDown);
  addEventListener(editor, 'drop', onDrop);
  addEventListener(editor, 'paste', onPaste);

  /*
   * Exports
   */
  return {
    el: editor,
    [COMMENT_EDITOR_GET_TEXT]: (): string => editor.value,
    [COMMENT_EDITOR_SET_PLACEHOLDER]: (replyUser = ''): void => {
      editor.placeholder = replyUser ? `@${replyUser}` : locale.placeholder;
    },
    [COMMENT_EDITOR_UPLOAD_IMAGE]: upload,
  };
};
