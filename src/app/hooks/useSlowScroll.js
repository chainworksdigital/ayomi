import { useEffect } from "react";

const useSlowScroll = () => {
  useEffect(() => {
    const handleScroll = (event) => {
      event.preventDefault();
      window.scrollBy({
        top: event.deltaY * 0.3, // Adjust the multiplier to control speed (0.3 slows it down)
        behavior: "smooth",
      });
    };

    window.addEventListener("wheel", handleScroll, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleScroll);
    };
  }, []);
};

export default useSlowScroll;
