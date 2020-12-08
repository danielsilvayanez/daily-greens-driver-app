import React from "react";
import styled from "styled-components";

/* Get the current date*/
var today = new Date();
var dd = String(today.getDate()).padStart(2, "0");
var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
var yyyy = today.getFullYear();

today = dd + "/" + mm + "/" + yyyy;
document.write(today);
/* Get the current date*/

export const Header = () => {
  return (
    <>
      <StyledHeader>
        <div>
          <h1>Daily Greens</h1>
          <h2>Fahrername</h2>
        </div>
        <StyledDiv2>
          <h2>{today}</h2>
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
