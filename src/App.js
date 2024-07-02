import React from "react";
import "./App.css";

import Header from "./components/Header";
import Main from "./pages/Main";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Header />
      <div className="container">
        <Main />
      </div>
      <Footer />
    </>
  );
}

export default App;
