import React, { useState } from "react";
import styled from "styled-components";

export default function Messages({ communication }) {
  const [newMessage, setNewMessage] = useState({
    message: "",
  });

  return (
    <section>
      <StyledMessageArea>
        <h1>Neue Nachrichten</h1>
        {communication.map((com) => (
          <>
            <StyledDiv>Admin: {com.messages.admin}</StyledDiv>
            <StyledDiv>Driver: {com.messages.driver}</StyledDiv>
          </>
        ))}
      </StyledMessageArea>
      <StyledFloatingArea>
        <StyledForm onSubmit={handleSubmit}>
          <label htmlFor="message">Neue Nachricht: </label>
          <input
            type="text"
            name="message"
            onChange={handleChange}
            value={newMessage.message}
          />
        </StyledForm>
      </StyledFloatingArea>
    </section>
  );
  function handleChange(event) {
    setNewMessage({
      ...newMessage,
      [event.target.name]: event.target.value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    setNewMessage({
      message: "",
    });
  }
}

const StyledMessageArea = styled.section`
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: left;
`;

const StyledForm = styled.form`
  input {
    width: 53vh;
  }
`;

const StyledFloatingArea = styled.section`
  position: absolute;
  bottom: 50px;
  padding: 10px;
  display: flex;
  width: 100%;
  border: 2px solid var(--secondaryBGPurple);
  border-radius: 5px;

  align-items: baseline;
`;

const StyledDiv = styled.div`
  margin-top: 5px;
`;
