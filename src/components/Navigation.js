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
      <StyledNavLink to="/next">Morgen</StyledNavLink>
    </Nav>
  );
}

const Nav = styled.nav`
  display: flex;
  width: 100%;
  height: 48px;
  position: fixed;
  bottom: 0;
  background-color: var(--secondaryBGPurple);
`;

const StyledNavLink = styled(NavLink)`
  display: flex;
  flex-grow: 1;
  border: none;
  margin-right: 2px;
  justify-content: center;
  align-items: center;
  text-align: center;
  text-decoration: none;
  padding: 5px;

  :hover {
    cursor: pointer;
  }

  :visited {
    color: var(--primaryBGBtnGreen);
  }

  &.active {
    background-color: var(--primaryBGBtnGreen);
    color: var(--primaryBgWhite);
  }
`;
