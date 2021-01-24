import React, { useState } from "react";
import styled from "styled-components";
import Button from "./Button";
import NotesIcon from "../icons/notes-icon.jsx";

export default function Order({
  delivery,
  disabledState,
  setDeliveries,
  index,
  deliveries,
  details,
  setNewindex,
}) {
  const [btnStartState, setBtnStartState] = useState(true);
  const [btnDoneState, setBtnDoneState] = useState(true);
  const [btnDisabled, setBtnDisabled] = useState(true);
  return (
    <>
      <StyledDiv>
        {details ? (
          <Container height="120" background="var(--secondaryBGPurple)">
            <div>{delivery.name}</div>
            <div>{delivery.street}</div>
            <div>Tagesessen: {delivery.daymeal}</div>
            <div>Wochenessen: {delivery.weekmeal}</div>
            {delivery.message ? (
              <StyledNotes>Notizen: {delivery.message}</StyledNotes>
            ) : (
              <StyledNotes></StyledNotes>
            )}
            <Button
              btnName="start"
              disabledState={false}
              btnState={btnStartState}
              onClick={() => {
                let newDeliveries = [...deliveries];
                newDeliveries[index].start = true;
                setDeliveries(newDeliveries);
                setBtnStartState(!btnStartState);
                setBtnDisabled(!btnDisabled);
              }}
            />

            <Button
              btnName="erledigt"
              btnState={btnDoneState}
              disabledState={btnDisabled}
              onClick={() => {
                alert("Biste sicher?");
                let newDeliveries = [...deliveries];
                newDeliveries[index].done = true;
                setDeliveries(newDeliveries);
                setNewindex(index + 1);
                setBtnDoneState(!btnDoneState);
              }}
            />
          </Container>
        ) : (
          <Container
            onClick={() => {
              setNewindex(index);
            }}
          >
            <div>{delivery.name}</div>
            <div>{delivery.street}</div>
            {delivery.message && <StyledNotesIcon />}
          </Container>
        )}
      </StyledDiv>
    </>
  );
}
const StyledDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  width: 100%;
  border: 1px solid var(--primaryBGBtnGreen);
  margin: 10px;
`;

const Container = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: ${(props) => props.height || 60}px;
  width: 100%;
  justify-content: space-around;
  align-items: center;
  > * {
    text-align: center;
  }
`;

const StyledNotesIcon = styled(NotesIcon)`
  position: absolute;
  left: 350px;
`;

const StyledNotes = styled.div`
  display: grid;
  grid-column-start: 1;
  grid-column-end: 3;
  border: 1px solid var(--primaryBGBtnGreen);
  color: var(--secondaryBGPurple);
  font-weight: bold;
`;
