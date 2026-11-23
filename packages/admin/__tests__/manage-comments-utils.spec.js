import { describe, expect, it } from 'vitest';

import { getCommentEditDraft } from '../src/pages/manage-comments/utils.js';

describe('comment edit drafts', () => {
  it('uses the original markdown when available', () => {
    expect(
      getCommentEditDraft({
        nick: 'nick',
        mail: 'mail@example.com',
        link: 'https://example.com',
        comment: '<p>rendered</p>',
        orig: '**markdown**',
      }),
    ).toStrictEqual({
      nick: 'nick',
      mail: 'mail@example.com',
      link: 'https://example.com',
      comment: '**markdown**',
    });
  });

  it('falls back to the rendered comment and empty values', () => {
    expect(getCommentEditDraft({ comment: '<p>rendered</p>' })).toStrictEqual({
      nick: '',
      mail: '',
      link: '',
      comment: '<p>rendered</p>',
    });
  });

  it('keeps the editable fields from the row shape passed by the page', () => {
    expect(
      getCommentEditDraft({
        objectId: 'comment-1',
        nick: 'nick',
        status: 'approved',
        rid: 0,
        pid: 0,
        sticky: 0,
        mail: 'mail@example.com',
        link: 'https://example.com',
        comment: '<p>rendered</p>',
        orig: '**markdown**',
      }),
    ).toStrictEqual({
      nick: 'nick',
      mail: 'mail@example.com',
      link: 'https://example.com',
      comment: '**markdown**',
    });
  });
});
