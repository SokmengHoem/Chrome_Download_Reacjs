import React, { useContext } from "react";
import { useTheme } from "../../contexts/ThemeContext";

function PageContent() {
  const { theme, toggleTheme } = useTheme();
  return (
    <>
      <div className=" text-center mt-5">
        <div
          className={`${
            theme === "light" ? " bg-white" : " bg-black text-white"
          } mb-5 py-2`}
        >
          PageContent
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

export default PageContent;
