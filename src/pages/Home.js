import React, { useContext } from "react";
import styled from "styled-components";
import LoginContext from "../components/auth/loginContext";

export default function Home({ deliveries }) {
  const { user } = useContext(LoginContext);
  const reducer = (a, b) => a + b;

  const dayMealDailyTotal = deliveries
    .map((delivery) => delivery.dayMeal)
    .reduce(reducer);

  const weekMealDailyTotal = deliveries
    .map((delivery) => delivery.weekMeal)
    .reduce(reducer);

  const boxDailyTotal = deliveries
    .map((delivery) => delivery.box)
    .reduce(reducer);

  return (
    <StyledArea>
      <div>
        {user ? (
          <StyledSalutation>Moin {user.displayName} !</StyledSalutation>
        ) : null}
      </div>
      <StyledOverview>
        <p>Dashboard</p>
        <p>Tagesgericht gesamt: {dayMealDailyTotal}</p>
        <p>Wochengericht gesamt: {weekMealDailyTotal}</p>
        <p>Pfandboxen zurück: {boxDailyTotal}</p>
      </StyledOverview>
    </StyledArea>
  );
}

const StyledSalutation = styled.h1`
  margin-top: 10px;
`;

const StyledArea = styled.section`
  display: flex;
  align-items: center;
  flex-direction: column;
  border: 1px solid black;
`;

const StyledOverview = styled.section`
  margin-top: 80px;
  padding: 10px;
  font-size: 1.6em;
  display: flex;
  justify-content: center;
  flex-direction: column;
  border: 1px solid black;
  border-radius: 25px;
`;
