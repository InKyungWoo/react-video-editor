import React from "react";
import MobileHeader from "../components/mobileview/MobileHeader";
import MobileEditor from "../components/mobileview/MobileEditor";
import MobileFooter from "../components/mobileview/MobileFooter";

const MobileView = ({ theme }) => {
  return (
    <>
      <MobileHeader darkMode={theme === "dark"} />
      <div className="mobile_container">
        <MobileEditor />
      </div>
      <MobileFooter darkMode={theme === "dark"} />
    </>
  );
};

export default MobileView;
