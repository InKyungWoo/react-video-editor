import React from "react";
import "./App.css";
import useDeviceType from "./hooks/useDeviceType";

import DesktopView from "./pages/DesktopView";
import MobileView from "./pages/MobileView";

function App() {
  const device = useDeviceType();

  return (
    <>
      {device === "mobile" ? (
        // 모바일 환경
        <MobileView />
      ) : (
        // pc. 태블릿 환경 (768px 초과)
        <DesktopView />
      )}
    </>
  );
}

export default App;
