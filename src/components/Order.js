import React, { useState } from "react";
import styled from "styled-components";
import Button from "./Button";
import NotesIcon from "../icons/notes-icon.jsx";
import Star from "../icons/star-icon";
import { patchDelivery } from "../Firebase/services";
import BoxModal from "./BoxModal";

export default function Order({
  delivery,
  setDeliveries,
  index,
  documentId,
  deliveries,
  details,
  meals,
  setNewindex,
}) {
  let keys = [];
  let values = [];

  keys = Object.keys(delivery.extra);
  values = Object.values(delivery.extra);

  const [showModal, setShowModal] = useState(false);
  const [individualstop, setIndividualstopStop] = useState(delivery.stop);

  function handleSubmit(boxNum, smallboxNum, drivermessage) {
    let newDeliveries = [...deliveries];
    newDeliveries[index].document.box = Number(boxNum);
    newDeliveries[index].document.smallbox = Number(smallboxNum);
    newDeliveries[index].document.drivermessage = drivermessage;
    newDeliveries[index].document.done = true;
    setDeliveries(newDeliveries);
    setNewindex(index + 1);
    patchDelivery(documentId, newDeliveries[index].document);
  }

  function handleChange(event) {
    event.target.name === "stop" && setIndividualstopStop(event.target.value);
  }

  function handleSubmitStop() {
    let newDeliveries = [...deliveries];
    newDeliveries[index].document.stop = Number(individualstop);
    setDeliveries(newDeliveries);
    setNewindex(index + 1);
    patchDelivery(documentId, newDeliveries[index].document);
  }

  return (
    <DeliveryContainer>
      {details ? (
        <Container>
          {delivery.newcustomer && <StyledStar />}
          <StyledNotes>
            <h2>{delivery.name}</h2>
            {!delivery.done && (
              <StyledForm onSubmit="handleSubmitStop">
                <label htmlFor="stop">Stopp </label>
                <input
                  type="number"
                  name="stop"
                  value={individualstop}
                  onChange={handleChange}
                  maxLength="2"
                />
                <button onClick={handleSubmitStop}>speichern</button>
              </StyledForm>
            )}
          </StyledNotes>
          {delivery.message && (
            <StyledNotes>
              <StyledDivider>
                <hr></hr>
              </StyledDivider>
              <p>
                Notizen:{" "}
                <ImportantMessage>"{delivery.message}"</ImportantMessage>
              </p>
              <StyledDivider>
                <hr></hr>
              </StyledDivider>
            </StyledNotes>
          )}
          <div>{delivery.street}</div>
          <div>{delivery.phone}</div>

          {Object.keys(meals.document).map(
            (meal, index) =>
              delivery[meal] > 0 && (
                <div>
                  {Object.values(meals.document)[index]}: {delivery[meal]}
                </div>
              )
          )}
          <StyledDivider>
            <hr></hr>
            <p>
              Deine Nachricht:
              <ImportantMessage>"{delivery.drivermessage}"</ImportantMessage>
            </p>
          </StyledDivider>
          <StyledExtras>
            {keys.map((extrakey, index) => (
              <div>
                {extrakey}: {values[index]}
              </div>
            ))}
          </StyledExtras>
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
                onClick={() => setShowModal(!showModal)}
              />
            </>
          )}
          {showModal && (
            <BoxModal toggleModal={setShowModal} handleSubmit={handleSubmit} />
          )}
        </Container>
      ) : (
        <Container
          onClick={() => {
            setNewindex(index);
          }}
        >
          {delivery.newcustomer && <StyledStar />}
          <div>{delivery.name}</div>
          <div>{delivery.street}</div>
          {delivery.message && <StyledNotesIcon />}
        </Container>
      )}
    </DeliveryContainer>
  );
}
const DeliveryContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  width: 100%;
  margin-top: 10px;
  padding: 0 10px;
  position: relative;
`;

const StyledStar = styled(Star)`
  position: absolute;
  left: 15px;
  margin: 5px;
`;

const StyledForm = styled.form`
  input {
    font-size: 1.5rem;
    width: 50px;
  }

  button {
    height: 60px;
    border: 2px solid var(--secondaryBGPurple);
    background-color: ${(props) =>
      props.primary ? "var(--primaryBGBtnGreen)" : "var(--primaryBgWhite)"};
    border-radius: 15px;
    margin: 5px 0 0 15px;
  }
`;

const ImportantMessage = styled.span`
  color: var(--secondaryBGPurple);
  font-weight: bold;
  font-style: italic;
`;

const Container = styled.div`
  display: grid;
  border-radius: 15px;
  border: 2px solid var(--primaryBGPurpleDarker);
  grid-template-columns: 1fr 1fr;
  height: auto;
  padding: 20px;
  width: 100%;
  justify-content: space-around;
  align-items: center;
  > * {
    text-align: center;
  }
  background-color: var(--primaryBgWhite);
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
  top: 15px;
  left: 14px;
  font-size: 1.5em;
`;

const StyledNotes = styled.div`
  display: grid;
  grid-column-start: 1;
  grid-column-end: 3;
  font-size: 1.5em;
  margin: 15px 0;
`;

const StyledExtras = styled.div`
  display: grid;
  grid-column-start: 1;
  grid-column-end: 3;
  font-weight: bold;
  background-color: var(--primaryBgWhite);
`;

const StyledDivider = styled.div`
  margin-top: 5px;
  display: grid;
  grid-column-start: 1;
  grid-column-end: 3;
  font-weight: bold;
  background-color: var(--primaryBgWhite);
`;
