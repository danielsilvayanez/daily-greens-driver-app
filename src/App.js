import React from "react";
import { Switch, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import List from "./pages/List";
import Messages from "./pages/Messages";
import styled from "styled-components";
import { Header } from "./components/Header";
import deliveries from "./defaultData.json";
import mockMessages from "./messages.json";

export default function App() {
  return (
    <AppGrid>
      <Header />
      <Switch>
        <Route exact path="/">
          <Home deliveries={deliveries} />
        </Route>
        <Route path="/list">
          <List deliveries={deliveries} />
        </Route>
        <Route path="/messages">
          <Messages communication={mockMessages} />
        </Route>
      </Switch>
      <Navigation />
    </AppGrid>
  );
}

const AppGrid = styled.div`
  height: 100vh;
  display: grid;
  grid-template-rows: 60px auto 48px;
`;
