import React from 'react';
import styled from 'styled-components';

export default function Button({ onClick, btnName, btnState = true }) {
  return (
    <StyledButton
      onClick={() => {
        onClick();
        // setState(!state);
      }}
      primary={btnState}
    >
      {btnName}
    </StyledButton>
  );
}
const StyledButton = styled.button`
height: 50px;
  background-color: ${(props) => (props.primary ? 'white' : 'green')};
  border-radius: 5px;
  }
`;
