import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    //capture div with content that is scrollable and reset to top
    document.querySelector(".main-view").scrollTo(0,0);
  }, [pathname]);

  return null;
}