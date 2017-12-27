import React from 'react'

export default (props, context) => {
  return (
    <div className={`${props.type} notice-message`}>{props.message}</div>
  )
}
