import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import List from "./pages/List";
import Done from "./pages/Done";
import styled from "styled-components";
import { Header } from "./components/Header";
import mockDeliveries from "./defaultData.json";
import useAuth from "./components/auth/useAuth";
import LoginContext from "./components/auth/loginContext";
import firebaseApp from "./Firebase/index";
import UserBar from "./components/auth/UserBar";
import Login from "./components/auth/Login";
import { fetchDeliveries, fetchMeals } from "./Firebase/services";

export default function App() {
  const [deliveries, setDeliveries] = useState([]);
  const user = useAuth();
  const [meals, setMeals] = useState({});

  useEffect(() => {
    fetchMeals().then((dbResult) => {
      setMeals(dbResult[0]);
    });
    user &&
      fetchDeliveries(user.uid).then((dbResult) => {
        setDeliveries(dbResult.sort(compare));
      });
  }, [user]);

  function compare(a, b) {
    const stopA = a.document.stop;
    const stopB = b.document.stop;

    let comparison = 0;
    if (stopA > stopB) {
      comparison = 1;
    } else if (stopA < stopB) {
      comparison = -1;
    }
    return comparison;
  }

  return (
    <LoginContext.Provider value={{ user, firebaseApp }}>
      {user !== null ? (
        <AppGrid>
          <Header />
          <Main>
            <Switch>
              <Route path="/list">
                <List
                  meals={meals}
                  deliveries={deliveries}
                  setDeliveries={setDeliveries}
                />
              </Route>
              <Route path="/done">
                <Done
                  deliveries={deliveries}
                  setDeliveries={setDeliveries}
                  meals={meals}
                />
              </Route>
              <Route path="/">
                <Home deliveries={deliveries} meals={meals} />
              </Route>
            </Switch>
          </Main>
          <UserBar />
          <Navigation />
        </AppGrid>
      ) : (
        <AppGrid>
          <Header UserBar={UserBar} />
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

const Main = styled.main`
  overflow-y: scroll;
  position: relative;

  &::after {
    content: "";
    display: block;
    height: 75px;
  }
`;
