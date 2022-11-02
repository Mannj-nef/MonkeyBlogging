import { useEffect, useRef } from "react";

function useClickOutSide(setShow) {
  const dropdownRef = useRef();
  useEffect(() => {
    const handleClosedropdown = (e) => {
      if (!setShow) {
        console.error("useClickOutSide must be need setShow ");
        return;
      }
      const target = e.target;
      if (dropdownRef.current && !dropdownRef.current.contains(target)) {
        setShow(false);
      }
    };

    document.body.addEventListener("click", handleClosedropdown);

    return () =>
      document.body.removeEventListener("click", handleClosedropdown);
  }, [setShow]);

  return { dropdownRef };
}

export default useClickOutSide;
