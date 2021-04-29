/* global hexo */

'use strict';

const Util = require('@next-theme/utils');
const utils = new Util(hexo, __dirname);

function capitalize(input) {
  return input.toString().charAt(0).toUpperCase() + input.toString().substr(1);
}

function iconText(icon, key, defaultValue) {
  if (!defaultValue) {
    defaultValue = capitalize(key);
  }
  return `
    <span class="post-meta-item-icon">
      <i class="${icon}"></i>
    </span>
    {%- set post_meta_comment = __('post.comments.${key}') %}
    {%- if post_meta_comment == 'post.comments.${key}' %}
      {%- set post_meta_comment = '${defaultValue}' %}
    {%- endif %}
    <span class="post-meta-item-text">{{ post_meta_comment + __('symbol.colon') }}</span>
  `;
}

function warning(...args) {
  hexo.log.warn(
    `Since ${args[0]} is turned on, the ${args[1]} is disabled to avoid potential hazards.`
  );
}

// Add comment
hexo.extend.filter.register('theme_inject', (injects) => {
  const config = utils.defaultConfigFile('waline', 'default.yaml');
  if (!config.enable || !config.serverURL) return;

  injects.comment.raw(
    'waline',
    '<div class="comments" id="waline-comments"></div>',
    {},
    { cache: true }
  );

  injects.bodyEnd.raw('waline', utils.getFileContent('waline.njk'));

  injects.head.raw(
    'waline',
    `<link rel="dns-prefetch" href="${config.serverURL}">`,
    {},
    {}
  );
});

// Add post_meta
hexo.extend.filter.register('theme_inject', (injects) => {
  const config = utils.defaultConfigFile('waline', 'default.yaml');
  if (!config.enable || !config.serverURL) return;

  injects.postMeta.raw(
    'waline_comments',
    `
  {% if post.comments and (is_post() or config.waline.comment_count) %}
  <span class="post-meta-item">
    ${iconText('far fa-comment', 'waline')}
    <a title="waline" href="{{ url_for(post.path) }}#waline-comments" itemprop="discussionUrl">
      <span class="post-comments-count waline-comment-count" id="{{ url_for(post.path) }}" data-xid="{{ url_for(post.path) }}" itemprop="commentCount"></span>
    </a>
  </span>
  {% endif %}
  `,
    {},
    {}
  );

  if (config.visitor) {
    if (
      hexo.theme.config.leancloud_visitors &&
      hexo.theme.config.leancloud_visitors.enable
    ) {
      warning('waline.visitor', 'leancloud_visitors');
      hexo.theme.config.leancloud_visitors.enable = false;
      return;
    }

    injects.postMeta.raw(
      'waline_visitors',
      `
    <span id="{{ url_for(post.path) }}" class="post-meta-item leancloud_visitors" data-flag-title="{{ post.title }}" title="{{ __('post.views') }}">
      <span class="post-meta-item-icon">
        <i class="far fa-eye"></i>
      </span>
      <span class="post-meta-item-text">{{ __('post.views') + __('symbol.colon') }}</span>
      <span class="leancloud-visitors-count"></span>
    </span>
  `,
      {},
      {}
    );
  }
});
