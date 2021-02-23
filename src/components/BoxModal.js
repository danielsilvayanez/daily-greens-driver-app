import React, { useEffect, useState } from "react";
import styled from "styled-components";

export default function BoxModal({ handleSubmit, toggleModal }) {
  const [box, setBox] = useState({ bigbox: 0, smallbox: 0 });

  useEffect(() => {
    console.log("big and small boxes", box);
  }, [box]);

  return (
    <div>
      <Form>
        <label>
          Pfandboxen groß:
          <input
            type="number"
            onChange={handleChange}
            name="bigbox"
            value={box.bigbox}
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
      </Form>
      <button
        onClick={() => {
          console.log("------>", box.bigbox, box.smallbox);
          handleSubmit(box.bigbox, box.smallbox);
          toggleModal(false);
        }}
      >
        Ok
      </button>
      <button
        onClick={() => {
          toggleModal(false);
        }}
      >
        Abbrechen
      </button>
    </div>
  );
  function handleChange(event) {
    setBox({ ...box, [event.target.name]: event.target.value });
  }
}

const Form = styled.form`
  z-index: 100;
`;
