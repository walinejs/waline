import cls from 'classnames';
import React from 'react';

export default function Paginator({ current, total, onChange }) {
  if (total < 1) {
    return null;
  }

  return (
    <ul className="typecho-pager">
      {current > 1 ? (
        <li className="prev">
          <button type="button" onClick={() => onChange(current - 1)}>
            «
          </button>
        </li>
      ) : null}
      {current > 4 ? (
        <>
          <li>
            <button type="button" onClick={() => onChange(1)}>
              1
            </button>
          </li>
          <li>
            <span>...</span>
          </li>
        </>
      ) : null}
      {[current - 3, current - 2, current - 1, current, current + 1, current + 2, current + 3]
        .filter((page) => page > 0 && page <= total)
        .map((page) => (
          <li key={page} className={cls({ current: page === current })}>
            <button type="button" onClick={() => onChange(page)}>
              {page}
            </button>
          </li>
        ))}
      {current < total - 3 ? (
        <>
          <li>
            <span>...</span>
          </li>
          <li>
            <button type="button" onClick={() => onChange(total)}>
              {total}
            </button>
          </li>
        </>
      ) : null}
      {current < total ? (
        <li className="next">
          <button type="button" onClick={() => onChange(current + 1)}>
            »
          </button>
        </li>
      ) : null}
    </ul>
  );
}
