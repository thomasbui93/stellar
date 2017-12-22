import React from 'react'
import { Spinner, Card } from 'belle'

export default () => {
  return (
    <Card
      style={{ fontSize: 20,
        color: '#666',
        textAlign: 'center',
        border: 'none'
      }}>
    Loading <Spinner characterStyle={{ fontSize: 20 }} />
    </Card>
  )
}
