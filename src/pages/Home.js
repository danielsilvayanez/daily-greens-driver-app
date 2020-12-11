import React from 'react';
import deliveries from '../defaultData.json';

export default function Home() {
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
    <section>
      <p>Dashboard</p>
      <p>Tagesgericht gesamt: {dayMealDailyTotal}</p>
      <p>Wochengericht gesamt: {weekMealDailyTotal}</p>
      <p>Pfandboxen zurück: {boxDailyTotal}</p>
    </section>
  );
}
