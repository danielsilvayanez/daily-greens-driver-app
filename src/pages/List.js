import React from 'react'
import Order from '../components/Order'
import styled from 'styled-components'

export default function List({ deliveries }) {
  return (
    <Orderlist>
      {deliveries.map((delivery) => (
        <Order delivery={delivery} />
      ))}
    </Orderlist>
  )
}

const Orderlist = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
`
