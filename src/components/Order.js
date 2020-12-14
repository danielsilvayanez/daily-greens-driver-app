import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

export default function Order({ delivery }) {
  const [details, setDetails] = useState(false)
  useEffect(() => {
    console.log(details)
  }, [details])
  return (
    <>
      {details ? (
        <Container height="120" onClick={() => setDetails(!details)}>
          <Name>{delivery.address.name}</Name>
          <Address>{delivery.address.street}</Address>
          <div>Tagesessen: {delivery.dayMeal}</div>
          <div>Wochenessen: {delivery.weekMeal}</div>
        </Container>
      ) : (
        <Container onClick={() => setDetails(!details)}>
          <Name>{delivery.address.name}</Name>
          <Address>{delivery.address.street}</Address>
        </Container>
      )}
    </>
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
