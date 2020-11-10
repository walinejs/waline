import React, { useContext, useState } from 'react';
import { ConfigContext } from '../context';
import timeAgo from '../utils/timeAgo';
import CommentBox from './CommentBox';

export default function CommentCard({comment, boxConfig, rootId, onSubmit}) {
  const [reply, setReply] = useState(null);

  const ctx = useContext(ConfigContext);

  return (
    <div className="vcard" id={comment.objectId}>
      <img 
        className="vimg" 
        src={ctx.gravatarSetting.cdn + comment.mail + ctx.gravatarSetting.params} 
      />
      <div className="vh">
        <div className="vhead">
          <a className="vnick" rel="nofollow" href={comment.link} target="_blank">{comment.nick}</a>
          <span className="vsys">{comment.browser}</span>
          <span className="vsys">{comment.os}</span>
        </div>
        <div className="vmeta">
          <span className="vtime">{timeAgo(comment.insertedAt, ctx.locale)}</span>
          <span 
            className="vat" 
            onClick={_ => setReply(comment)}
          >
            {ctx.locale.reply}
          </span>
        </div>
        <div 
          className="vcontent" 
          data-expand={ctx.locale.expand}
          dangerouslySetInnerHTML={{__html: comment.comment}}  
        ></div>
        {!reply ? null : (
          <div className="vreply-wrapper">
            <CommentBox 
              {...boxConfig} 
              replyId={reply && reply.objectId}
              replyUser={reply && reply.nick} 
              rootId={rootId}
              onCanelReply={_ => setReply(null)} 
              onSubmit={onSubmit} 
            />
          </div>
        )}
        {Array.isArray(comment.children) ? (
          <div className="vquote">
            {comment.children.map(cmt => (
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