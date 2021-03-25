import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import LoginContext from "../components/auth/loginContext";

export default function Home({ deliveries, meals }) {
  const { user } = useContext(LoginContext);
  const reducer = (a, b) => a + b;
  const [dayMealDailyTotal, setDayMealDailyTotal] = useState(0);
  const [dailyTotal, setDailyTotal] = useState([0, 0, 0, 0]);
  const [boxSmallDailyTotal, setBoxSmallDailyTotal] = useState(0);
  const [extras, setExtras] = useState([]);
  const [boxDailyTotal, setBoxDailyTotal] = useState(0);

  useEffect(() => {
    if (deliveries.length > 0) {
      setDayMealDailyTotal(
        deliveries
          .map((delivery) => Number(delivery.document.daymeal))
          .reduce(reducer)
      );

      setDailyTotal([
        deliveries
          .map((delivery) => Number(delivery.document.dessert1))
          .reduce(reducer),
        deliveries
          .map((delivery) => Number(delivery.document.dessert2))
          .reduce(reducer),
        deliveries
          .map((delivery) => Number(delivery.document.weekmeal1))
          .reduce(reducer),
        deliveries
          .map((delivery) => Number(delivery.document.weekmeal2))
          .reduce(reducer),
      ]);

      setBoxDailyTotal(
        deliveries
          .map((delivery) => Number(delivery.document.box))
          .reduce(reducer)
      );

      setBoxSmallDailyTotal(
        deliveries
          .map((delivery) => Number(delivery.document.smallbox))
          .reduce(reducer)
      );
      setExtras(Object.entries(getExtras()));
    }
  }, [deliveries]);

  console.log("meeeals", meals);

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
        ? (cache = {
            ...cache,
            [key]: Number(cache[key]) + Number(values[index]),
          })
        : (cache = { ...cache, [key]: Number(values[index]) });
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
        {meals.document &&
          Object.keys(meals.document).map((meal, index) => (
            <div>
              {Object.values(meals.document)[index]}: {dailyTotal[index]}
            </div>
          ))}
        <br />

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
