import React, { useEffect, useState } from "react";
import styled from "styled-components";

export default function BoxModal({ handleSubmit, toggleModal }) {
  const [box, setBox] = useState({ bigbox: 0, smallbox: 0 });

  useEffect(() => {
    console.log("big and small boxes", box);
  }, [box]);

  return (
    <ModalContainer>
      <form>
        <label>
          Pfandboxen groß:
          <input
            type="number"
            onChange={handleChange}
            name="bigbox"
            value={box.bigbox}
            maxLength="2"
            size="2"
          />
        </label>
        <label>
          Pfandboxen klein:
          <input
            type="number"
            onChange={handleChange}
            name="smallbox"
            value={box.smallbox}
            maxLength="2"
            size="2"
          />
        </label>
      </form>
      <Button
        onClick={() => {
          console.log("------>", box.bigbox, box.smallbox);
          handleSubmit(box.bigbox, box.smallbox);
          toggleModal(false);
        }}
      >
        Ok
      </Button>
      <Button
        onClick={() => {
          toggleModal(false);
        }}
      >
        Abbrechen
      </Button>
    </ModalContainer>
  );
  function handleChange(event) {
    setBox({ ...box, [event.target.name]: event.target.value });
  }
}
const ModalContainer = styled.div`
  display: grid;
  grid-column-start: 1;
  grid-column-end: 3;
  background-color: var(--primaryBgWhite);
  margin: 20px 0 0;
  position: absolute;
  top: 50%;
  z-index: 100;
  width: 100%;
  border-radius: 15px;
  padding: 10px;
  font-size: 1.5em;
  box-shadow: var(--secondaryBGPurple) 0px 0px 0px 2px inset,
    rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px,
    rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px,
    rgba(0, 0, 0, 0.09) 0px -3px 5px;
  form label {
    float: center;
  }
  form input {
    margin-left: 5px;
    font-size: 1em;
  }
`;

const Button = styled.button`
  height: 50px;
  border: 2px solid var(--secondaryBGPurple);
  background-color: ${(props) =>
    props.primary ? "var(--primaryBGBtnGreen)" : "var(--primaryBgWhite)"};
  border-radius: 15px;
  margin: 10px 2px 0;
  font-size: 1em;
  cursor: pointer;
  :active {
    background-color: var(--secondaryBGPurple);
    color: var(--primaryBgWhite);
  }
`;
