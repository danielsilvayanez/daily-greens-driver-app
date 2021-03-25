import React, { useState } from "react";
import Order from "../components/Order";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
      {deliveries.map((delivery, index) => (
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
        </OrderContainer>
      ))}
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
  /* padding: 10px; */
`;

const RevertArrow = styled(FontAwesomeIcon)`
  font-size: 50px;
  color: var(--secondaryBGPurple);
  position: absolute;
  right: 0;
  top: 0px;
`;
