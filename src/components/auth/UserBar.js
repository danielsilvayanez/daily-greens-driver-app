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
    <ButtonContainer>
      {user ? <Button onClick={logoutFromFirebase}>Logout</Button> : undefined}
    </ButtonContainer>
  );
}
const ButtonContainer = styled.div`
  margin: 15px 5px 15px 0;
  display: flex;
  justify-content: flex-end;
`;

const Button = styled.button`
  position: absolute;
  bottom: 55px;
  border-radius: 50%;
  border: 1px solid grey;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px,
    rgba(0, 0, 0, 0.22) 0px 15px 12px;
  height: 60px;
  width: 60px;
  background-color: var(--primaryBgWhite);
`;
