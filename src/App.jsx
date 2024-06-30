import React from "react";

import GlobalStyle from "./styles/globalStyles";
import Header from "./components/Header";
import VideoEditor from "./pages/VideoEditor";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <GlobalStyle />
      <Header />
      <div className="container">
        <VideoEditor />
      </div>
      <Footer />
    </>
  );
}

export default App;
