import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import LoginContext from "../components/auth/loginContext";

export default function Home({ deliveries }) {
  const { user } = useContext(LoginContext);
  const reducer = (a, b) => a + b;
  const [dayMealDailyTotal, setDayMealDailyTotal] = useState(0);
  const [weekMealDailyTotal, setWeekMealDailyTotal] = useState(0);
  const [boxDailyTotal, setBoxDailyTotal] = useState(0);

  useEffect(() => {
    if (deliveries.length > 0) {
      setDayMealDailyTotal(
        deliveries.map((delivery) => delivery.document.daymeal).reduce(reducer)
      );

      setWeekMealDailyTotal(
        deliveries.map((delivery) => delivery.document.weekmeal).reduce(reducer)
      );

      setBoxDailyTotal(
        deliveries.map((delivery) => delivery.document.box).reduce(reducer)
      );
    }
  }, [deliveries]);

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
