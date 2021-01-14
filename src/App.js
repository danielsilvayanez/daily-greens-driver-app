import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import List from "./pages/List";
import styled from "styled-components";
import { Header } from "./components/Header";
import mockDeliveries from "./defaultData.json";
import useAuth from "./components/auth/useAuth";
import LoginContext from "./components/auth/loginContext";
import firebaseApp from "./Firebase/index";

export default function App() {
  const [deliveries, setDeliveries] = useState(mockDeliveries);
  const user = useAuth();

  return (
    <LoginContext.Provider value={{ user, firebaseApp }}>
      <AppGrid>
        <Header />
        <Switch>
          <Route exact path="/">
            <Home deliveries={deliveries} />
          </Route>
          <Route path="/list">
            <List deliveries={deliveries} setDeliveries={setDeliveries} />
          </Route>
        </Switch>
        <Navigation />
      </AppGrid>
    </LoginContext.Provider>
  );
}

const AppGrid = styled.div`
  height: 100vh;
  display: grid;
  grid-template-rows: 60px auto 48px;
`;
