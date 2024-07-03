import React, { useState } from "react";
import "./App.css";
import useDeviceType from "./hooks/useDeviceType";
import DesktopView from "./pages/DesktopView";
import MobileView from "./pages/MobileView";

function App() {
  const device = useDeviceType();
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    document.body.classList.toggle("dark-mode", nextTheme === "dark");
  };

  return (
    <div id="root" className={theme === "dark" ? "dark-mode" : ""}>
      <button className={`button toggle ${theme}`} onClick={toggleTheme}>
        {theme === "light"
          ? "Switch to Dark Mode 🌙"
          : "Switch to Light Mode ☀️"}
      </button>
      {device === "mobile" ? (
        <MobileView theme={theme} />
      ) : (
        <DesktopView theme={theme} />
      )}
    </div>
  );
}

export default App;
