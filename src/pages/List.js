import React from 'react';
import Order from '../components/Order';
import styled from 'styled-components';

export default function List({ deliveries, setDeliveries }) {
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
