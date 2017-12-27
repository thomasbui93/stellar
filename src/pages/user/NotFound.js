import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'belle'

export default () => {
  return (
    <Card style={{ fontSize: 14,
      color: '#666',
      textAlign: 'center',
      border: 'none'
    }}>
      Your request can not be found here. <br />
      Please return to home page at <Link to='/'>here</Link>.
    </Card>
  )
}
