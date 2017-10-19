import React from 'react'

export const StaticTag = (props) => {
  return <div className={`${props.className} message`}>{props.staticText}</div>
}
