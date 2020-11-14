import React from 'react';
import cls from 'classnames';

export default function({current, total, onChange}) {
  if(total < 1) {
    return null;
  }
  
  return (
    <ul class="typecho-pager">
      {current > 1 ? (
        <li class="prev">
          <a href="javascript:void(0)" onClick={_ => onChange(current - 1)}>«</a>
        </li>
      ) : null}
      {current > 4 ? (
        <>
          <li><a href="javascript:void(0)" onClick={_ => onChange(1)}>1</a></li>
          <li><span>...</span></li>
        </>
      ) : null}
      {[
        current - 3, 
        current - 2, 
        current - 1, 
        current, 
        current + 1, 
        current + 2, 
        current + 3
      ].filter(page => page > 0 && page <= total).map(page => (
        <li className={cls({current: page === current})}>
          <a href="javascript:void(0)" onClick={_ => onChange(page)}>{page}</a>
        </li>
      ))}
      {current < total - 3 ? (
        <>
          <li><span>...</span></li>
          <li><a href="javascript:void(0)" onClick={_ => onChange(total)}>{total}</a></li>
        </>
      ) : null}
      {current < total ? (
        <li class="next"><a href="javascript:void(0)" onClick={_ => onChange(current + 1)}>»</a></li>
      ) : null}
    </ul>
  )
}