import  { useEffect, useState } from "react";
import { HiEllipsisVertical } from "react-icons/hi2";
import Search from "./Search";

function NavBar() {

    const [header, setHeader] = useState<boolean>(false);
    
    const scrollHeader = () => {
        if (window.scrollY > 10) {
          setHeader(true);
        } else {
          setHeader(false);
        }
      };
    
      useEffect(() => {
        window.addEventListener('scroll', scrollHeader);
        return () => {
          window.removeEventListener('scroll', scrollHeader);
        }
      })
    
  return (
    <div>
      <div
        className={
          header
            ? "fixed w-full flex justify-between items-center px-5 py-3 bg-white shadow-md"
            : "fixed w-full flex justify-between items-center px-5 py-3 bg-white"
        }
      >
        <div className="w-[25%] flex items-center gap-5 ">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Google_Chrome_icon_%28February_2022%29.svg/2048px-Google_Chrome_icon_%28February_2022%29.svg.png"
            alt=""
            className=" w-8 h-8"
          />
          <h3 className=" font-semibold text-2xl">Download</h3>
        </div>
        <div className=" w-[50%]">
          <div className=" relative flex items-center">
                <Search/>
          </div>
        </div>
        <div className="w-[25%] flex justify-end items-center">
          <HiEllipsisVertical size={24} />
        </div>
      </div>
    </div>
  );
}

export default NavBar;
