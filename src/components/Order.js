import React, { useState } from 'react'
import styled from 'styled-components'

export default function Order({ delivery }) {
  const [details, setDetails] = useState(false)

  return (
    <Container onClick={() => setDetails(true)}>
      <Name>{delivery.address.name}</Name>
      <Address>{delivery.address.street}</Address>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  height: ${(props) => props.height || 60}px;
  width: 80%;
  justify-content: space-around;
  align-items: center;
  border: solid 1px #000;
`

const Name = styled.div``

const Address = styled.div``
