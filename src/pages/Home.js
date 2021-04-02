import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import LoginContext from "../components/auth/loginContext";

export default function Home({ deliveries, meals }) {
  const { user } = useContext(LoginContext);
  const reducer = (a, b) => a + b;
  const [dayMealDailyTotal, setDayMealDailyTotal] = useState(0);
  const [dailyWeekMeal1Total, setdailyWeekMeal1Total] = useState(0);
  const [dailyWeekMeal2Total, setdailyWeekMeal2Total] = useState(0);
  const [dailyDessert1Total, setdailyDessert1Total] = useState(0);
  const [dailyDessert2Total, setdailyDessert2Total] = useState(0);
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

      setdailyWeekMeal1Total(
        deliveries
          .map((delivery) => Number(delivery.document.weekmeal1))
          .reduce(reducer)
      );

      setdailyWeekMeal2Total(
        deliveries
          .map((delivery) => Number(delivery.document.weekmeal2))
          .reduce(reducer)
      );

      setdailyDessert1Total(
        deliveries
          .map((delivery) => Number(delivery.document.dessert1))
          .reduce(reducer)
      );

      setdailyDessert2Total(
        deliveries
          .map((delivery) => Number(delivery.document.dessert2))
          .reduce(reducer)
      );

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

  console.log("meeeals", deliveries);

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
        <p>Tagesgerichte: {dayMealDailyTotal}</p>
        {meals?.document && (
          <p>
            {meals?.document?.weekmeal1}: {dailyWeekMeal1Total}
          </p>
        )}
        {meals?.document && (
          <p>
            {meals?.document?.weekmeal2}: {dailyWeekMeal2Total}
          </p>
        )}
        {meals?.document && (
          <p>
            {meals?.document?.dessert1}: {dailyDessert1Total}
          </p>
        )}
        {meals?.document && (
          <p>
            {meals?.document?.dessert2}: {dailyDessert2Total}
          </p>
        )}
        <br />
        {extras.map((extra) => (
          <p>
            {extra[0]}: {extra[1]}
          </p>
        ))}
      </StyledOverview>
      <StyledOverview>
        <h3>Rücknahme Pfand</h3>
        <p>Boxen groß: {boxDailyTotal}</p>
        <p>Boxen klein: {boxSmallDailyTotal}</p>
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
