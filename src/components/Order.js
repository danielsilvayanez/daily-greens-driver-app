import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "./Button";
import NotesIcon from "../icons/notes-icon.jsx";

export default function Order({ delivery, setDeliveries, index, deliveries }) {
  const [details, setDetails] = useState(false);
  const [state, setState] = useState(true);

  useEffect(() => {
    console.log(details);
  }, [details]);

  return (
    <>
      {/* {!delivery.done ? ( */}
      <StyledDiv>
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
            {delivery.notes ? (
              <StyledNotes>Notizen: {delivery.notes}</StyledNotes>
            ) : (
              <StyledNotes></StyledNotes>
            )}
            <Button
              btnName="start"
              btnState={state}
              onClick={() => {
                JSON.parse((delivery.start = true));
                setState(!state);
              }}
            />

            <Button
              btnName="erledigt"
              onClick={() => {
                alert("Biste sicher?");
                setDeliveries(JSON.parse((deliveries[index].done = true)));
              }}
            />
          </Container>
        ) : (
          <Container onClick={() => setDetails(!details)}>
            <div>{delivery.address.name}</div>
            <div>{delivery.address.street}</div>
            {delivery.notes && <StyledNotesIcon />}
          </Container>
        )}
      </StyledDiv>
      {/* ) : (
        console.log('Auftrag erledigt')
      )} */}
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
