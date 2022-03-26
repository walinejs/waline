import { CommentBoxState } from './state';
import { getConfig, h } from '../../utils';

/*
 * Event Constants
 */
export const COMMENT_PREVIEW_TOGGLE = 't';
export const COMMENT_PREVIEW_UPDATE = 'u';

/*
 * Component Type
 */
export interface CommentPreview {
  el: HTMLDivElement;
  [COMMENT_PREVIEW_TOGGLE]: (display: boolean) => void;
  [COMMENT_PREVIEW_UPDATE]: (previewText: string) => void;
}

/**
 * Comment Box Preview Area
 */
export const commentPreview = (state: CommentBoxState): CommentPreview => {
  /*
   * internalData
   */
  const { locale } = getConfig();

  /*
   * DOM
   */
  const previewContent = h<HTMLDivElement>('div', { class: 'wl-content' });
  const preview = h<HTMLDivElement>(
    'div',
    {
      class: 'wl-preview',
      style: 'display:none',
    },
    [h('h4', {}, locale.preview), previewContent]
  );

  /*
   * Exports
   */
  return {
    el: preview,
    [COMMENT_PREVIEW_TOGGLE]: (display: boolean): void => {
      preview.style.display = display ? 'block' : 'none';
    },
    [COMMENT_PREVIEW_UPDATE]: (previewText: string): void => {
      previewContent.innerHTML = previewText;
    },
  };
};
