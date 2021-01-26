import React, { useState, useEffect } from "react";
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
import UserBar from "./components/auth/UserBar";
import Login from "./components/auth/Login";
import { fetchDeliveries } from "./Firebase/services";

export default function App() {
  const [deliveries, setDeliveries] = useState([]);
  const user = useAuth();

  useEffect(() => {
    user &&
      fetchDeliveries(user.uid).then((dbResult) => {
        setDeliveries(dbResult);
      });
  }, [user]);

  useEffect(() => {
    deliveries.length > 0 &&
      console.log("deliveries----->", deliveries[0].documentId);
    // patchDeliveries(???, ????).then((dbResult) => {
    //   setDeliveries(dbResult);
    // });
  }, [deliveries]);

  return (
    <LoginContext.Provider value={{ user, firebaseApp }}>
      {user !== null ? (
        <AppGrid>
          <Header UserBar={UserBar} />
          <Switch>
            <Route path="/list">
              <List deliveries={deliveries} setDeliveries={setDeliveries} />
            </Route>
            <Route path="/">
              <Home deliveries={deliveries} />
            </Route>
          </Switch>
          <Navigation />
        </AppGrid>
      ) : (
        <AppGrid>
          <Switch>
            <Route exact path="/">
              <Login />
            </Route>
          </Switch>
        </AppGrid>
      )}
    </LoginContext.Provider>
  );
}

const AppGrid = styled.div`
  height: 100vh;
  display: grid;
  grid-template-rows: 60px auto 48px;
`;
