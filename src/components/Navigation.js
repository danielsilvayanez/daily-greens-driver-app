import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export default function Navigation() {
  return (
    <Nav>
      <StyledNavLink exact to="/">
        Dashboard
      </StyledNavLink>
      <StyledNavLink to="/list">Aufträge</StyledNavLink>
    </Nav>
  );
}

const Nav = styled.nav`
  display: flex;

  padding: 0;
`;

const StyledNavLink = styled(NavLink)`
  flex-grow: 1;
  border: 2px solid var(--primaryFont);
  text-align: center;
  text-decoration: none;
  padding: 5px;

  :visited {
    color: var(--primaryFont);
  }

  &.active {
    background-color: var(--primaryFont);
    color: var(--primaryBg);
  }
`;
