import React, { useState } from "react";
import Order from "../components/Order";
import styled from "styled-components";

export default function List({ deliveries, setDeliveries }) {
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
          !delivery.done && (
            <Order
              delivery={delivery}
              deliveries={deliveries}
              setDeliveries={setDeliveries}
              index={index}
              details={showDetails(index)}
              setNewindex={setNewindex}
            />
          )
      )}
    </Orderlist>
  );
}

const Orderlist = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
