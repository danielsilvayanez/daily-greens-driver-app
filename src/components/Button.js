import React from "react";
import styled from "styled-components";

export default function Button({ onClick, btnName, btnState, disabledState }) {
  return (
    <StyledButton
      disabled={disabledState}
      onClick={() => {
        onClick();
      }}
      primary={btnState}
    >
      {btnName}
    </StyledButton>
  );
}

const StyledButton = styled.button`
  height: 50px;
  background-color: ${(props) => (props.primary ? "green" : "white")};
  border-radius: 5px;
`;
