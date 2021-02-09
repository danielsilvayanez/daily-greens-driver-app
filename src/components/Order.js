import React, { useState } from "react";
import styled from "styled-components";
import Button from "./Button";
import NotesIcon from "../icons/notes-icon.jsx";
import { patchDelivery } from "../Firebase/services";

export default function Order({
  delivery,
  disabledState,
  setDeliveries,
  index,
  documentId,
  deliveries,
  details,
  setNewindex,
}) {
  const [btnDisabled, setBtnDisabled] = useState(true);

  console.log("deliveryDone-->", delivery.done);

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
            <StyledNotes>Telefon: {delivery.phone} </StyledNotes>
            <Button
              btnName="start"
              btnState={delivery.start}
              onClick={() => {
                let newDeliveries = [...deliveries];
                newDeliveries[index].document.start = !delivery.start;
                setDeliveries(newDeliveries);
                patchDelivery(documentId, newDeliveries[index].document);
              }}
            />

            <Button
              disabledState={!delivery.start}
              btnName="erledigt"
              btnState={delivery.done}
              onClick={() => {
                let newDeliveries = [...deliveries];

                newDeliveries[index].box = Number(
                  prompt("Wie viele Pfandboxen hast du zurück bekommen?")
                );
                newDeliveries[index].document.done = true;
                setDeliveries(newDeliveries);
                setNewindex(index + 1);
                patchDelivery(documentId, newDeliveries[index].document);
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
