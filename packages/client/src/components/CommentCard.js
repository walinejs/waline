import React, { useContext, useState } from 'react';
import { ConfigContext } from '../context';
import timeAgo from '../utils/timeAgo';
import CommentBox from './CommentBox';

export default function CommentCard({ comment, boxConfig, rootId, onSubmit }) {
  const [reply, setReply] = useState(null);

  const ctx = useContext(ConfigContext);

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
    <div className="vcard" id={comment.objectId}>
      <img
        className="vimg"
        src={
          comment.avatar ||
          ctx.gravatarSetting.cdn + comment.mail + ctx.gravatarSetting.params
        }
      />
      <div className="vh">
        <div className="vhead">
          <a className="vnick" rel="nofollow" href={link} target="_blank">
            {comment.nick}
          </a>
          {comment.type === 'administrator' ? (
            <span className="vmark" data-type={comment.type}>
              {ctx.locale.admin}
            </span>
          ) : null}
          <span className="vsys">{comment.browser}</span>
          <span className="vsys">{comment.os}</span>
        </div>
        <div className="vmeta">
          <span className="vtime">
            {timeAgo(comment.insertedAt, ctx.locale)}
          </span>
          <span className="vat" onClick={(_) => setReply(comment)}>
            {ctx.locale.reply}
          </span>
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
              onCancelReply={(_) => setReply(null)}
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
