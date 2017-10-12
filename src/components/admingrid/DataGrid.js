import React from 'react'
import {DataRow} from './DataRow'

export const DataGrid = props => {
  const {items, rowClassName, baseUrl, className, removeAction} = props;
  return <div className={`admin-data-grid ${className}`}>
    {items && items.length > 0 ? renderList(items, rowClassName, baseUrl, removeAction) : <p className="empty-grid">Your grid is currently empty</p>}
  </div>
};

const renderList = (items, rowClassName, baseUrl, removeAction) => {
  return items.map(item => {
    const populatedItem = {...item, baseUrl, removeAction};
    return <DataRow item={populatedItem} className={rowClassName} key={item.key} />
  })
};
