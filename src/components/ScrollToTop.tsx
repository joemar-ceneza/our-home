import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Resets scroll to the top whenever the route changes — SPAs otherwise keep
// the previous page's scroll position when navigating.
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
