import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Noto Sans KR', sans-serif;
    background-color: #f8f9fa;
  }

  #root {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .container {
    width: 100%;
    max-width: 1024px;
    padding: 0 1rem;
    margin: 0 auto;
    /* background-color: red; */
  }

`;

export default GlobalStyle;
