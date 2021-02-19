import React, { useState } from 'react'
import styled from 'styled-components'

export default function BoxModal({ handleSubmit }) {
  const [box, setBox] = useState({ box: 0, smallbox: 0 })
  const [display, setDisplay] = useState('block')
  return (
    <Form display={display}>
      <label>
        Pfandboxen groß:
        <input
          type="number"
          onChange={handleChange}
          name="box"
          value={box.box}
        />
      </label>
      <label>
        Pfandboxen klein:
        <input
          type="number"
          onChange={handleChange}
          name="smallbox"
          value={box.smallbox}
        />
      </label>
      <button
        onClick={() => {
          handleSubmit(box.box, box.smallbox)
          setDisplay('none')
        }}
      >
        Ok
      </button>
      <button onClick={setDisplay('none')}>Abbrechen</button>
    </Form>
  )

  function handleChange(event) {
    setBox({ [event.target.name]: event.target.value })
  }
}

const Form = styled.form`
  z-index: 100;
  display: ${(props) => props.display};
`
