import { GrUpdate } from "react-icons/gr";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useChrome } from "../../../contexts/ChromeContext";


export default function FloatingButton() {
  const {handleShowPopup, buttonIcon} = useChrome();
  return (
    <button
      className="bg-blue-600 w-12 py-2 rounded-xl flex justify-center items-center hover:bg-blue-500 transition-all duration-150"
      onClick={() => handleShowPopup(true)}
    >
      { buttonIcon ? (
        <GrUpdate size={30} className="text-white" />
      ) : (
        <IoIosAddCircleOutline size={30} className="text-white" />
      )}
    </button>
  );
}

