import React, { useContext } from "react";
import LoginContext from "./loginContext";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

export default function UserBar() {
  const { user, firebaseApp } = useContext(LoginContext);
  const history = useHistory();

  async function logoutFromFirebase() {
    await firebaseApp.signOut();
    history.push("/");
  }

  return (
    <div>
      {user ? (
        <Button onClick={logoutFromFirebase}>Logout</Button>
      ) : (
        <>
          <button onClick={() => history.push("/login")}>Login</button> |
        </>
      )}
    </div>
  );
}

const Button = styled.button`
  position: absolute;
  right: 10px;
  bottom: 70px;
  border-radius: 50%;
  border: none;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px,
    rgba(0, 0, 0, 0.22) 0px 15px 12px;
  height: 50px;
  background-color: var(--primaryBgWhite);
`;
