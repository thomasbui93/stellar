import React from 'react';

export const StaticTag = (props) => {
  return <div className={`${props.className} static-tag`}>{props.staticText}</div>
};