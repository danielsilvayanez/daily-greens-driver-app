import React, { useEffect, useState } from "react";
import styled from "styled-components";

export default function Order({ delivery }) {
  const [details, setDetails] = useState(false);
  const [state, setState] = useState(true);

  useEffect(() => {
    console.log(details);
  }, [details]);

  return (
    <>
      {!delivery.done ? (
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
              <StyledButton
                primary={state}
                onClick={() => {
                  JSON.parse((delivery.start = true));
                  setState(false);
                }}
              >
                start
              </StyledButton>
              <StyledButton
                primary
                onClick={() => {
                  alert("Biste sicher?");
                  JSON.parse((delivery.done = true));
                }}
              >
                done
              </StyledButton>
            </Container>
          ) : (
            <Container onClick={() => setDetails(!details)}>
              <div>{delivery.address.name}</div>
              <div>{delivery.address.street}</div>
            </Container>
          )}
        </StyledDiv>
      ) : (
        console.log("Auftrag erledigt")
      )}
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

const StyledNotes = styled.div`
  display: grid;
  grid-column-start: 1;
  grid-column-end: 3;
  border: 1px solid var(--primaryBGBtnGreen);
  color: var(--secondaryBGPurple);
  font-weight: bold;
`;

const Container = styled.div`
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

const StyledButton = styled.button`
  height: 50px;
  background-color: ${(props) => (props.primary ? "white" : "green")};
  border-radius: 5px;
  }
`;
