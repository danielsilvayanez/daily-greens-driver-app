import React, { useState } from "react";
import styled from "styled-components";
import Button from "./Button";
import NotesIcon from "../icons/notes-icon.jsx";
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
  let mealKeys = [];
  let mealValues = [];
  //mealKeys = Object.keys(meals.document)
  //console.log(mealKeys)
  //mealValues = Object.values(meals.document)
  const [showModal, setShowModal] = useState(false);

  function handleSubmit(boxNum, smallboxNum) {
    let newDeliveries = [...deliveries];
    newDeliveries[index].document.box = Number(boxNum);
    newDeliveries[index].document.smallbox = Number(smallboxNum);
    newDeliveries[index].document.done = true;
    setDeliveries(newDeliveries);
    setNewindex(index + 1);
    patchDelivery(documentId, newDeliveries[index].document);
  }

  return (
    <DeliveryContainer>
      {details ? (
        <Container>
          {delivery.message ? (
            <StyledNotes>
              <p>Telefon: {delivery.phone}</p>
              <p>Notizen: {delivery.message}</p>
            </StyledNotes>
          ) : (
            <StyledPhone>
              <p>Telefon: {delivery.phone}</p>
            </StyledPhone>
          )}
          <div>{delivery.name}</div>
          <div>{delivery.street}</div>
          <StyledDivider>
            <hr></hr>
          </StyledDivider>
          {delivery.daymeal > 0 && (
            <StyledExtras>
              <div>Tagesessen: {delivery.daymeal}</div>
            </StyledExtras>
          )}
          <StyledDivider>
            <hr></hr>
          </StyledDivider>
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

const Container = styled.div`
  display: grid;
  border-radius: 15px;
  border: 2px solid var(--secondaryBGPurple);
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

const StyledPhone = styled.div`
  display: grid;
  grid-column-start: 1;
  grid-column-end: 3;
  font-size: 1.5em;
  margin: 0 0 15px;
  background-image: linear-gradient(#ff9d2f, #ff6126);
`;

const StyledNotes = styled.div`
  display: grid;
  grid-column-start: 1;
  grid-column-end: 3;
  background-image: linear-gradient(#ff9d2f, #ff6126);
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
