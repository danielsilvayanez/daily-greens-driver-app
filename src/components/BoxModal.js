import React, { useState } from "react";
import styled from "styled-components";

export default function BoxModal({ handleSubmit, toggleModal }) {
  const [box, setBox] = useState({ bigbox: 0, smallbox: 0, drivermessage: "" });

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
        <label>
          Nachricht
          <input
            type="textarea"
            onChange={handleChange}
            name="drivermessage"
            value={box.driverMessage}
          />
        </label>
      </form>
      <Button
        onClick={() => {
          handleSubmit(box.bigbox, box.smallbox, box.drivermessage);
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
  background-color: var(--primaryBgWhite);
  border-radius: 15px;
  position: absolute;
  z-index: 999;
  top: 0;
  left: 0;
  margin: 0;
  width: 100%;
  padding: 10px;

  font-size: 1.5em;
  box-shadow: var(--secondaryBGPurple) 0px 0px 0px 5px inset,
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
  background-color: ${(props) =>
    props.primary ? "var(--primaryBGBtnGreen)" : "var(--primaryBgWhite)"};
  border-radius: 15px;
  margin: 10px 2px 0;
  font-size: 1.5em;
  cursor: pointer;
  :active {
    background-color: var(--primaryBGPurpleDarker);
    color: var(--primaryBgWhite);
  }
`;
