import React, { useState } from "react";
import Order from "../components/Order";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { patchDelivery } from "../Firebase/services";

export default function List({ deliveries, setDeliveries, meals }) {
  const [newIndex, setNewindex] = useState(0);
  function showDetails(index) {
    if (index === newIndex) {
      return true;
    }
    return false;
  }

  return (
    <Orderlist>
      {deliveries.map(
        (delivery, index) =>
          delivery.document.done && (
            <OrderContainer>
              <Order
                delivery={delivery.document}
                deliveries={deliveries}
                setDeliveries={setDeliveries}
                index={index}
                details={showDetails(index)}
                setNewindex={setNewindex}
                key={delivery.documentId}
                documentId={delivery.documentId}
                meals={meals}
              />

              <RevertArrow
                icon={faArrowAltCircleLeft}
                onClick={() => {
                  let newDeliveries = [...deliveries];
                  newDeliveries[index].document.done = false;
                  setDeliveries(newDeliveries);
                  patchDelivery(
                    delivery.documentId,
                    newDeliveries[index].document
                  );
                }}
              />
            </OrderContainer>
          )
      )}
    </Orderlist>
  );
}

const OrderContainer = styled.div`
  position: relative;
  width: 100%;
`;

const Orderlist = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const RevertArrow = styled(FontAwesomeIcon)`
  font-size: 50px;
  color: var(--secondaryBGPurple);
  position: absolute;
  right: 0;
  top: 0px;
`;
