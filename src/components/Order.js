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

            {!delivery.done && (
              <>
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
              </>
            )}
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
  margin: 10px;
`;

const Container = styled.div`
  border-radius: 15px;
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
  background-color: var(--primaryFontGrey);
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
    rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  color: black;
  :hover {
    cursor: pointer;
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
  font-weight: bold;
`;
