// ./src/components/auth/Login.js

import React, { useRef } from "react";
import styled from "styled-components";
import firebaseApp from "../../Firebase/index";
import { useHistory } from "react-router-dom";

export default function Login() {
  const userEmail = useRef(null);
  const userPassword = useRef(null);
  const history = useHistory();

  async function loginWithFirebase(email, password) {
    await firebaseApp.signInWithEmailAndPassword(email, password);
    return history.push("/home");
  }

  return (
    <div>
      <h2>Moin, bitte hier einloggen</h2>
      <form
        onSubmit={(event) => (
          event.preventDefault(),
          loginWithFirebase(userEmail.current.value, userPassword.current.value)
        )}
      >
        <div>
          <StyledLabel htmlFor="user-email">E-Mail</StyledLabel>
          <StyledInput
            htmlId="user-email"
            name="user-email"
            type="text"
            ref={userEmail}
          />
        </div>
        <div>
          <StyledLabel htmlFor="user-password">Password</StyledLabel>
          <StyledInput
            htmlId="user-password"
            name="user-password"
            type="password"
            ref={userPassword}
          />
        </div>
        <div>
          <StyledButton type="submit">Login</StyledButton>
        </div>
      </form>
    </div>
  );
}

const StyledInput = styled.input`
  padding: 0.5em;
  margin: 0.5em;
  border: 1px solid gray;
  border-radius: 3px;
  width: 40%;
`;

const StyledLabel = styled.label`
  display: block;
  margin: 0 0.5em;
`;

const StyledButton = styled.button`
  display: block;
  margin: 0.5em;
`;
