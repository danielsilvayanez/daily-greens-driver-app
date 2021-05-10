import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import LoginContext from "../components/auth/loginContext";

export default function Home({ deliveries, meals }) {
  const { user } = useContext(LoginContext);
  const reducer = (a, b) => a + b;
  const [dayMeal1DailyTotal, setDayMeal1DailyTotal] = useState(0);
  const [dayMeal2DailyTotal, setDayMeal2DailyTotal] = useState(0);
  const [dayMeal3DailyTotal, setDayMeal3DailyTotal] = useState(0);
  const [dayMeal4DailyTotal, setDayMeal4DailyTotal] = useState(0);
  const [dayMeal5DailyTotal, setDayMeal5DailyTotal] = useState(0);
  const [dailyDessert1Total, setdailyDessert1Total] = useState(0);
  const [dailyDessert2Total, setdailyDessert2Total] = useState(0);
  const [boxSmallDailyTotal, setBoxSmallDailyTotal] = useState(0);
  const [extras, setExtras] = useState([]);
  const [boxDailyTotal, setBoxDailyTotal] = useState(0);

  useEffect(() => {
    if (deliveries.length > 0) {
      setDayMeal1DailyTotal(
        deliveries
          .map((delivery) => Number(delivery.document.daymeal1))
          .reduce(reducer)
      );

      setDayMeal2DailyTotal(
        deliveries
          .map((delivery) => Number(delivery.document.daymeal2))
          .reduce(reducer)
      );

      setDayMeal3DailyTotal(
        deliveries
          .map((delivery) => Number(delivery.document.daymeal3))
          .reduce(reducer)
      );

      setDayMeal4DailyTotal(
        deliveries
          .map((delivery) => Number(delivery.document.daymeal4))
          .reduce(reducer)
      );

      setDayMeal5DailyTotal(
        deliveries
          .map((delivery) => Number(delivery.document.daymeal5))
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
        <h3>Übersicht Gerichte</h3>
        {meals?.document && dayMeal1DailyTotal > 0 && (
          <p>
            {meals?.document?.daymeal1}: {dayMeal1DailyTotal}
          </p>
        )}
        {meals?.document && dayMeal2DailyTotal > 0 && (
          <p>
            {meals?.document?.daymeal2}: {dayMeal2DailyTotal}
          </p>
        )}
        {meals?.document && dayMeal3DailyTotal > 0 && (
          <p>
            {meals?.document?.daymeal3}: {dayMeal3DailyTotal}
          </p>
        )}
        {meals?.document && dayMeal4DailyTotal > 0 && (
          <p>
            {meals?.document?.daymeal4}: {dayMeal4DailyTotal}
          </p>
        )}
        {meals?.document && dayMeal5DailyTotal > 0 && (
          <p>
            {meals?.document?.daymeal5}: {dayMeal5DailyTotal}
          </p>
        )}
        {meals?.document && dailyDessert1Total > 0 && (
          <p>
            {meals?.document?.dessert1}: {dailyDessert1Total}
          </p>
        )}
        {meals?.document && dailyDessert2Total > 0 && (
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
        <h3>Übersicht Pfandboxen</h3>
        {boxDailyTotal > 0 && <p>Boxen groß: {boxDailyTotal}</p>}
        {boxSmallDailyTotal > 0 && <p>Boxen klein: {boxSmallDailyTotal}</p>}
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
  border: 1px solid var(--primaryBGPurpleDarker);
  border-radius: 25px;
  background-color: var(--primaryBgWhite);
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
    rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
`;
