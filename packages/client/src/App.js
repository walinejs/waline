import React, { useCallback, useContext, useEffect, useReducer } from 'react';
import CommentBox from './components/CommentBox';
import CommentCard from './components/CommentCard';
import { ConfigContext } from './context';
import { fetchList } from './utils';

function App({ boxConfig, listConfig, copyRight }) {
  const ctx = useContext(ConfigContext);
  const [{ page, count, totalPages, loading, data }, dispatch] = useReducer(
    function (state, action) {
      return { ...state, ...action };
    },
    { page: 1, totalPages: 0, count: 0, loading: true, data: [] }
  );

  useEffect(() => {
    fetchList({ ...listConfig, page })
      .then((resp) =>
        dispatch({
          totalPages: resp.totalPages,
          loading: false,
          data: data.concat(resp.data),
          count: resp.count,
        })
      )
      .catch(() => dispatch({ loading: false }));
  }, []);

  const onLoadMore = useCallback(() => {
    const nextPage = page + 1;
    dispatch({ loading: true });

    fetchList({ ...listConfig, page: nextPage })
      .then((resp) =>
        dispatch({
          page: nextPage,
          totalPages: resp.totalPages,
          loading: false,
          data: data.concat(resp.data),
        })
      )
      .catch(() => dispatch({ loading: false }));
  }, [page, data]);

  const onSubmit = useCallback(
    (comment) => {
      if (comment.rid) {
        const cmt = data.find(({ objectId }) => objectId === comment.rid);
        if (!cmt) {
          return;
        }
        if (!Array.isArray(cmt.children)) {
          cmt.children = [];
        }
        cmt.children.push(comment);
      } else {
        data.unshift(comment);
      }

      dispatch({ data: Array.from(data) });
    },
    [data]
  );

  return (
    <div className="v" data-class="v">
      <CommentBox {...boxConfig} onSubmit={onSubmit} />
      <div className="vcount">
        {count ? <span className="vnum">{count}</span> : null}{' '}
        {ctx.locale.comments}
      </div>
      {data.length || !loading ? null : (
        <div className="vload-top text-center">
          <i className="vspinner" style={{ width: 30, height: 30 }}></i>
        </div>
      )}
      <div className="vcards">
        {data.map((comment) => (
          <CommentCard
            key={comment.objectId}
            rootId={comment.objectId}
            comment={comment}
            boxConfig={boxConfig}
            onSubmit={onSubmit}
          />
        ))}
      </div>
      {data.length && loading ? (
        <div className="vload-bottom text-center">
          <i className="vspinner" style={{ width: 30, height: 30 }}></i>
        </div>
      ) : null}
      {!data.length && !loading ? (
        <div className="vempty">{ctx.locale.sofa}</div>
      ) : null}
      {page < totalPages && !loading ? (
        <div className="vpage text-center">
          <button type="button" className="vmore vbtn" onClick={onLoadMore}>
            {ctx.locale.more}
          </button>
        </div>
      ) : null}
      {copyRight ? (
        <div className="vpower text-right">
          Powered by{' '}
          <a
            href="https://github.com/lizheming/Waline"
            target="_blank"
            rel="noreferrer"
          >
            Waline
          </a>{' '}
          v{VERSION}
        </div>
      ) : null}
    </div>
  );
}

export default App;
