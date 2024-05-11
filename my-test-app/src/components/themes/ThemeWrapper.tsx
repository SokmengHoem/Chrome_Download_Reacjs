import React, { useContext } from "react";
import { useTheme } from "../../contexts/ThemeContext";


function ThemeWrapper() {
    const { theme, toggleTheme } = useTheme();
  return (
    <>
      <div className=" mt-10 text-center">
      <div className={`${
          theme === "light" ? " bg-white" : " bg-black text-white"
        } mb-5 py-2`}
        >
        ThemeWrapper
      </div>
      <button
        onClick={toggleTheme}
        type="button"
        className={`${theme === "light" ? " bg-white" : " bg-black text-white"} px-4 py-2 rounded-xl`}
      >
        Change Theme
      </button>
      </div>
    </>
  );
}

export default ThemeWrapper;
