import React from "react";

import MobileHeader from "../components/mobileview/MobileHeader";
import MobileEditor from "../components/mobileview/MobileEditor";
import MobileFooter from "../components/mobileview/MobileFooter";

const MobileView = () => {
  return (
    <>
      <MobileHeader />
      <div className="mobile_container">
        <MobileEditor />
      </div>
      <MobileFooter />
    </>
  );
};

export default MobileView;
