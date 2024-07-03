import React from "react";

import Header from "../components/Header";
import VideoEditor from "../components/VideoEditor";
import Footer from "../components/Footer";

const DesktopView = ({ theme }) => {
  return (
    <>
      <Header darkMode={theme === "dark"} />
      <div className="desktop_container">
        <VideoEditor />
      </div>
      <Footer darkMode={theme === "dark"} />
    </>
  );
};

export default DesktopView;
