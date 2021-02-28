import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import LoginContext from "../components/auth/loginContext";

export default function Home({ deliveries }) {
  const { user } = useContext(LoginContext);
  const reducer = (a, b) => a + b;
  const [dayMealDailyTotal, setDayMealDailyTotal] = useState(0);
  const [weekMealDailyTotal, setWeekMealDailyTotal] = useState(0);
  const [boxDailyTotal, setBoxDailyTotal] = useState(0);
  const [boxSmallDailyTotal, setBoxSmallDailyTotal] = useState(0);
  const [extras, setExtras] = useState([]);

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

      setBoxSmallDailyTotal(
        deliveries.map((delivery) => delivery.document.smallbox).reduce(reducer)
      );
      setExtras(Object.entries(getExtras()));
    }
  }, [deliveries]);

  function getExtras() {
    const keys = [];
    const values = [];
    let cache = {};

    deliveries.map((delivery) => {
      keys.push(...Object.keys(delivery.document.extra));
      values.push(...Object.values(delivery.document.extra));
    });

    keys.map((key, index) => {
      key in cache
        ? (cache = { ...cache, [key]: cache[key] + values[index] })
        : (cache = { ...cache, [key]: values[index] });
    });
    return cache;
  }

  return (
    <StyledArea>
      <div>
        {user ? (
          <StyledSalutation>Moin {user.displayName} !</StyledSalutation>
        ) : null}
      </div>
      <StyledOverview>
        <h3>Dashboard</h3>
        <p>Tagesgericht gesamt: {dayMealDailyTotal}</p>
        <p>Wochengericht gesamt: {weekMealDailyTotal}</p>
        <br />
        <h4>Extra/s: </h4>

        {extras.map((extra) => (
          <p>
            {extra[0]}: {extra[1]}
          </p>
        ))}
      </StyledOverview>
      <StyledOverview>
        <h3>Pfandboxen Retour</h3>
        <p>Pfandboxen normal zurück: {boxDailyTotal}</p>
        <p>Pfandboxen klein zurück: {boxSmallDailyTotal}</p>
      </StyledOverview>
    </StyledArea>
  );
}

const StyledSalutation = styled.h1`
  margin-top: 10px;
`;

const StyledArea = styled.section`
  display: flex;
  align-items: left;
  margin: 0 5px;
  flex-direction: column;
`;

const StyledOverview = styled.section`
  margin-top: 10px;
  padding: 10px;
  font-size: 1.6em;
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  border-radius: 25px;
  background-color: var(--primaryBgWhite);
`;
