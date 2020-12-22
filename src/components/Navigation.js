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
      <StyledNavLink to="/messages">Nachrichten</StyledNavLink>
    </Nav>
  );
}

const Nav = styled.nav`
  display: flex;

  padding: 0;
`;

const StyledNavLink = styled(NavLink)`
  flex-grow: 1;
  border: 2px solid var(--primaryBGBtnGreen);
  text-align: center;
  text-decoration: none;
  padding: 5px;

  :visited {
    color: var(--primaryBGBtnGreen);
  }

  &.active {
    background-color: var(--primaryBGBtnGreen);
    color: var(--primaryBg);
  }
`;
