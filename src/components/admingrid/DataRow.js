import React from 'react'
import {Link} from 'react-router-dom'

export const DataRow = ({className, item}) => {
  return <div className={className}>
    <div className={`${className}__name`}>{item.name}</div>
    <div className={`${className}__key`}>{item.key}</div>
    <div className={`${className}__status`}>{item.isActive ? 'Active' : 'Archived'}</div>
    <div className={`${className}__action`}>
      <div className={`${className}__remove`} onClick={() => {item.removeAction(item.key)}} >Delete</div>
      <Link className={`${className}__edit`} to={`${item.baseUrl}/${item.key}`}>Edit</Link>
    </div>
  </div>
}
