import React from "react";
import styled from "styled-components";
import logo from "../assets/video-editor.png";

const Container = styled.header`
  /* display: flex; */

  width: 100%;
  padding: 1rem;
  margin-top: 1rem;

  border-bottom: 1px solid #ddd;
`;

const Content = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled.img`
  height: 40px;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  gap: 2rem;
`;

const NavItem = styled.a`
  text-decoration: none;
  color: #333;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    color: #007bff;
  }
`;

const Button = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const Header = () => {
  return (
    <Container>
      <Content>
        <Logo src={logo} alt="Video Editor Logo" />
        <Nav>
          <NavItem href="#video-edit">비디오 메뉴1</NavItem>
          <NavItem href="#video-edit">비디오 메뉴2</NavItem>
          <Button>비디오 메뉴 3</Button>
        </Nav>
      </Content>
    </Container>
  );
};

export default Header;
