import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  let myPath = useLocation().pathname;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [myPath]);

  return null;
}

export default ScrollToTop;
