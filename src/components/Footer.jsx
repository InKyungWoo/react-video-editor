import React from "react";
import styled from "styled-components";

const Container = styled.footer`
  border-top: 1px solid #ddd;
  width: 100%;
  padding: 1.5rem;
  margin-top: 2rem;

  /* test  */
  /* background-color: #9595dc; */
`;

const Content = styled.div`
  max-width: 1280px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
`;

const ContactInfo = styled.p`
  color: #666;
  font-size: 0.9rem;
`;

const Copyright = styled.p`
  color: #666;
  font-size: 0.9rem;
`;

const Links = styled.div`
  display: flex;
  gap: 2rem;
`;

const SocialLink = styled.a`
  text-decoration: none;
  color: #333;
  font-size: 1.2rem;
  transition: color 0.3s;

  &:hover {
    color: #007bff;
  }
`;

const Footer = () => {
  return (
    <Container>
      <Content>
        <ContactInfo>
          Tel. 02-2023-2025
          <br />
          E-mail. chacha_@hufs.ac.kr
        </ContactInfo>
        <Copyright>&copy; 2024 Video Editor. All rights reserved.</Copyright>

        <Links>
          <SocialLink href="#">Github</SocialLink>
          <SocialLink href="#">Notion</SocialLink>
          <SocialLink href="#">Instagram</SocialLink>
        </Links>
      </Content>
    </Container>
  );
};

export default Footer;
