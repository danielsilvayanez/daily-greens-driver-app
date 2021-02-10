import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

export default function Navigation() {
  return (
    <Nav>
      <StyledNavLink exact to="/">
        Dashboard
      </StyledNavLink>
      <StyledNavLink to="/list">Aufträge</StyledNavLink>
      <StyledNavLink to="/done">Erledigt</StyledNavLink>
    </Nav>
  );
}

const Nav = styled.nav`
  display: flex;
  width: 100%;
  bottom: 0;
`;

const StyledNavLink = styled(NavLink)`
  display: flex;
  flex-grow: 1;
  border: 2px solid var(--primaryBGBtnGreen);
  border-radius: 15px;
  margin-right: 2px;
  justify-content: center;
  align-items: center;
  text-align: center;
  text-decoration: none;
  padding: 5px;
  box-shadow: inset 1px 1px 1px #000;
  :hover {
    cursor: pointer;
  }

  :visited {
    color: var(--primaryFontGrey);
  }

  &.active {
    background-color: var(--primaryBGBtnGreen);
    color: var(--primaryBg);
  }
`;
