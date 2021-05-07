import React, { useContext, useState } from 'react';
import { ConfigContext } from '../context';
import { timeAgo } from '../utils';
import CommentBox from './CommentBox';
import { ReplyIcon } from './Icons';

export default function CommentCard({ comment, boxConfig, rootId, onSubmit }) {
  const [reply, setReply] = useState(null);

  const ctx = useContext(ConfigContext);

  // This is remained only because of existing comments
  // Links is now handled when inputing
  // Can be removed in future time
  const onContentClick = (e) => {
    if (e.target.tagName !== 'A') {
      return;
    }
    // Open link with new tab just with absolute URL.
    if (!/^https?:\/\//.test(e.target.href)) {
      return;
    }
    e.target.setAttribute('target', '_blank');
    e.target.setAttribute('rel', 'noreferrer noopener');
  };

  let link = comment.link;
  if (link && !/^https?:\/\//i.test(link)) {
    link = 'http://' + link;
  }

  return (
    <div className="vitem" id={comment.objectId}>
      <img
        className="vuser"
        src={
          comment.avatar ||
          ctx.gravatarSetting.cdn + comment.mail + ctx.gravatarSetting.params
        }
      />
      <div className="vcard">
        <div className="vhead">
          {link ? (
            <a
              className="vnick"
              rel="nofollow noreferrer"
              href={link}
              target="_blank"
            >
              {comment.nick}
            </a>
          ) : (
            <span className="vnick">{comment.nick}</span>
          )}
          {comment.type === 'administrator' ? (
            <span className="vbadge" data-type={comment.type}>
              {ctx.locale.admin}
            </span>
          ) : null}
          <span className="vtime">
            {timeAgo(comment.insertedAt, ctx.locale)}
          </span>
          <span
            className="vreply"
            title={ctx.locale.reply}
            role="button"
            onClick={() => setReply(comment)}
          >
            <ReplyIcon />
          </span>
        </div>
        <div className="vmeta">
          <span>{comment.browser}</span>
          <span>{comment.os}</span>
        </div>
        <div
          className="vcontent"
          data-expand={ctx.locale.expand}
          dangerouslySetInnerHTML={{ __html: comment.comment }}
          onClick={onContentClick}
        ></div>
        {!reply ? null : (
          <div className="vreply-wrapper">
            <CommentBox
              {...boxConfig}
              replyId={reply && reply.objectId}
              replyUser={reply && reply.nick}
              rootId={rootId}
              onCancelReply={() => setReply(null)}
              onSubmit={onSubmit}
            />
          </div>
        )}
        {Array.isArray(comment.children) ? (
          <div className="vquote">
            {comment.children.map((cmt) => (
              <CommentCard
                key={cmt.objectId}
                comment={cmt}
                rootId={rootId}
                boxConfig={boxConfig}
                onSubmit={onSubmit}
              />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
