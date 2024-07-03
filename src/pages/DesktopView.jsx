import React from "react";

import Header from "../components/Header";
import VideoEditor from "../components/VideoEditor";
import Footer from "../components/Footer";

const DesktopView = () => {
  return (
    <>
      <Header />
      <div className="desktop_container">
        <VideoEditor />
      </div>
      <Footer />
    </>
  );
};

export default DesktopView;
