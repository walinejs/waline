/* global hexo */

'use strict';

const Util = require('@next-theme/utils');

const utils = new Util(hexo, __dirname);

const warn = (...args) => {
  hexo.log.warn(
    `Since ${args[0]} is turned on, the ${args[1]} is disabled to avoid potential hazards.`,
  );
};

const capitalize = (input) => input.toString().charAt(0).toUpperCase() + input.toString().slice(1);

const iconText = (icon, key, defaultValue = capitalize(key)) =>
  `
    <span class="post-meta-item-icon">
      <i class="${icon}"></i>
    </span>
    {%- set post_meta_comment = __('post.comments.${key}') %}
    {%- if post_meta_comment == 'post.comments.${key}' %}
      {%- set post_meta_comment = '${defaultValue}' %}
    {%- endif %}
    <span class="post-meta-item-text">{{ post_meta_comment + __('symbol.colon') }}</span>
  `;

// Add comment
hexo.extend.filter.register('theme_inject', (injects) => {
  const config = utils.defaultConfigFile('waline', 'default.yaml');

  if (!config.enable || !config.serverURL) return;

  if (config.comment) {
    injects.comment.raw('waline', '<div class="comments" id="waline"></div>', {}, { cache: true });
  }

  injects.bodyEnd.raw('waline', utils.getFileContent('waline.njk'));

  injects.head.raw('waline', `<link rel="dns-prefetch" href="${config.serverURL}">`, {}, {});
});

// Add post_meta
hexo.extend.filter.register('theme_inject', (injects) => {
  const config = utils.defaultConfigFile('waline', 'default.yaml');

  if (!config.enable || !config.serverURL) return;

  if (config.commentCount) {
    injects.postMeta.raw(
      'waline_comments',
      `
    {% if post.comments and (is_post() or config.waline.commentCount) %}
    <span class="post-meta-item">
      ${iconText('far fa-comment', 'waline')}
      <a title="waline" href="{{ url_for(post.path) }}#waline" itemprop="discussionUrl">
        <span class="post-comments-count waline-comment-count" data-path="{{ url_for(post.path) }}" itemprop="commentCount"></span>
      </a>
    </span>
    {% endif %}
    `,
      {},
      {},
    );
  }

  if (config.pageview) {
    // ensure to turn of valine visitor
    if (hexo.theme.config.leancloud_visitors?.enable) {
      warn('waline.pageview', 'leancloud_visitors');
      hexo.theme.config.leancloud_visitors.enable = false;

      return;
    }

    injects.postMeta.raw(
      'waline_pageview',
      `
    <span class="post-meta-item" title="{{ __('post.views') }}">
      <span class="post-meta-item-icon">
        <i class="far fa-eye"></i>
      </span>
      <span class="post-meta-item-text">{{ __('post.views') + __('symbol.colon') }}</span>
      <span class="waline-pageview-count" data-path="{{ url_for(post.path) }}"></span>
    </span>
  `,
      {},
      {},
    );
  }
});
