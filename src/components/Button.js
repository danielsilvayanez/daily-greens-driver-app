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
  height: 80px;
  border: 2px solid var(--secondaryBGPurple);
  background-color: ${(props) =>
    props.primary ? "var(--primaryBGBtnGreen)" : "var(--primaryBgWhite)"};
  border-radius: 15px;
  margin: 5px 2px 5px;
`;
