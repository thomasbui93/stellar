import React from 'react'
import {Link} from 'react-router-dom'

export const SimpleTag = ({props}) => {
  const {classPrefix} = props
  return <div className={classPrefix}>
    <div className={`${classPrefix}__name`}>{props.name}</div>
    <div className={`${classPrefix}__key`}>{props.key}</div>
    <div className={`${classPrefix}__status`}>{props.isActive}</div>
    <div className={`${classPrefix}__action`}>
      <div className={`${classPrefix}__remove`} onClick={props.removeAction}>Delete</div>
      <Link className={`${classPrefix}__edit`} to={`${props.baseUrl}\\${props.key}`}>Edit</Link>
    </div>
  </div>
}
