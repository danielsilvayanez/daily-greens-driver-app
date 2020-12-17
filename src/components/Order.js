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
        <Container
          height="120"
          background="var(--secondaryBGPurple)"
          onClick={() => setDetails(!details)}
        >
          <div>{delivery.address.name}</div>
          <div>{delivery.address.street}</div>
          <div>Tagesessen: {delivery.dayMeal}</div>
          <div>Wochenessen: {delivery.weekMeal}</div>
        </Container>
      ) : (
        <Container onClick={() => setDetails(!details)}>
          <div>{delivery.address.name}</div>
          <div>{delivery.address.street}</div>
        </Container>
      )}
    </>
  )
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: ${(props) => props.height || 60}px;
  width: 100%;
  justify-content: space-around;
  align-items: center;
  border-bottom: solid 2px var(--primaryBGBtnGreen);
  > * {
    text-align: center;
  }
`

const Name = styled.div``

const Address = styled.div``
