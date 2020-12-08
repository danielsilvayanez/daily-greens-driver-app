import React from "react";
import styled from "styled-components";

export const Header = () => {
  return (
    <>
      <StyledHeader>
        <div>
          <h1>Daily Greens</h1>
          <h2>Fahrername</h2>
        </div>
        <StyledDiv2>
          <h2>Datum</h2>
        </StyledDiv2>
      </StyledHeader>
    </>
  );
};

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  border: 1px solid black;
  padding: 5px;
  align-items: flex-end;
`;

const StyledDiv2 = styled.div`
  display: flex;
  align-items: flex-end;
`;
