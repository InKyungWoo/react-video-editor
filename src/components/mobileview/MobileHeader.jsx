import React from "react";
import styled from "styled-components";
import { Navbar, Nav, Button } from "react-bootstrap";

import logoLight from "../../assets/logo_light.png";
import logoDark from "../../assets/logo_dark.png";

const MobileHeader = ({ darkMode }) => {
  return (
    <StyledNavbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">
          <Logo src={darkMode ? logoDark : logoLight} alt="Video Editor Logo" />
        </Navbar.Brand>
        <NavbarToggleWrapper>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
        </NavbarToggleWrapper>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#video-edit">비디오 메뉴1</Nav.Link>
            <Nav.Link href="#video-edit">비디오 메뉴2</Nav.Link>
          </Nav>
          <Button variant="primary">비디오 메뉴 3</Button>
        </Navbar.Collapse>
      </Container>
    </StyledNavbar>
  );
};

export default MobileHeader;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 768px;
  margin: 0 auto;
  margin-bottom: 2rem;
`;

const Logo = styled.img`
  margin-top: 1rem;
  height: 30px;
`;

const StyledNavbar = styled(Navbar)`
  background-color: var(--background-color) !important;
  color: var(--text-color);
  position: relative;
`;

const NavbarToggleWrapper = styled.div`
  position: fixed;
  top: 7rem;
  right: 0;
  transform: translateY(-50%) translateX(-50%);
  z-index: 1;
`;
