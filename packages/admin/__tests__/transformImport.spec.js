// @vitest-environment jsdom

import { describe, expect, it } from 'vitest';

import { transformImport } from '../src/utils/transformImport.js';

describe('wordpress imports', () => {
  it('imports WordPress comments from a WXR export', () => {
    const result = transformImport(
      'wordpress',
      `<?xml version="1.0" encoding="UTF-8"?>
      <rss xmlns:wp="http://wordpress.org/export/1.2/">
        <channel>
          <item>
            <link>https://example.com/posts/hello/?ref=feed</link>
            <wp:comment>
              <wp:comment_id>10</wp:comment_id>
              <wp:comment_author>Ada</wp:comment_author>
              <wp:comment_author_email>ada@example.com</wp:comment_author_email>
              <wp:comment_author_url>https://ada.example.com</wp:comment_author_url>
              <wp:comment_author_IP>192.0.2.1</wp:comment_author_IP>
              <wp:comment_date_gmt>2025-01-02 03:04:05</wp:comment_date_gmt>
              <wp:comment_content><![CDATA[Hello <strong>world</strong>]]></wp:comment_content>
              <wp:comment_approved>1</wp:comment_approved>
              <wp:comment_parent>0</wp:comment_parent>
              <wp:comment_type>comment</wp:comment_type>
            </wp:comment>
            <wp:comment>
              <wp:comment_id>11</wp:comment_id>
              <wp:comment_author>Grace</wp:comment_author>
              <wp:comment_date_gmt>2025-01-03 04:05:06</wp:comment_date_gmt>
              <wp:comment_content>Reply</wp:comment_content>
              <wp:comment_approved>spam</wp:comment_approved>
              <wp:comment_parent>10</wp:comment_parent>
              <wp:comment_type></wp:comment_type>
            </wp:comment>
            <wp:comment>
              <wp:comment_id>12</wp:comment_id>
              <wp:comment_approved>trash</wp:comment_approved>
              <wp:comment_type></wp:comment_type>
            </wp:comment>
            <wp:comment>
              <wp:comment_id>13</wp:comment_id>
              <wp:comment_approved>1</wp:comment_approved>
              <wp:comment_type>pingback</wp:comment_type>
            </wp:comment>
          </item>
        </channel>
      </rss>`,
    );

    expect(result.data.Comment).toStrictEqual([
      {
        objectId: '10',
        comment: 'Hello <strong>world</strong>',
        insertedAt: '2025-01-02T03:04:05.000Z',
        createdAt: '2025-01-02T03:04:05.000Z',
        updatedAt: '2025-01-02T03:04:05.000Z',
        ip: '192.0.2.1',
        link: 'https://ada.example.com',
        mail: 'ada@example.com',
        nick: 'Ada',
        ua: '',
        url: '/posts/hello/',
        pid: undefined,
        rid: undefined,
        status: 'approved',
      },
      {
        objectId: '11',
        comment: 'Reply',
        insertedAt: '2025-01-03T04:05:06.000Z',
        createdAt: '2025-01-03T04:05:06.000Z',
        updatedAt: '2025-01-03T04:05:06.000Z',
        ip: '',
        link: '',
        mail: '',
        nick: 'Grace',
        ua: '',
        url: '/posts/hello/',
        pid: '10',
        rid: '10',
        status: 'spam',
      },
    ]);
  });
});
