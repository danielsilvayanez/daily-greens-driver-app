import React from "react";
import styled from "styled-components";

const today = new Date();
let date =
  today.getDate() + "." + (today.getMonth() + 1) + "." + today.getFullYear();

export const Header = () => {
  return (
    <>
      <StyledHeader>
        <div>
          <h2>Daily Greens</h2>
          <h2>Fahrername</h2>
        </div>
        <StyledDiv2>
          <h2>{date}</h2>
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
  background-color: var(--primaryBGBtnGreen);
`;

const StyledDiv2 = styled.div`
  display: flex;
  align-items: flex-end;
`;
