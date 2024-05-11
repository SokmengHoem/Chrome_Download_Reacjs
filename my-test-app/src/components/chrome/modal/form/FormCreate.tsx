import { ChangeEvent, useEffect, useState } from "react";
import { MdClear } from "react-icons/md";
import { useChrome } from "../../../../contexts/ChromeContext";
import { IPropertiesCard } from "../../../../@types/@type.chrome";


let nextId: number = 1;

function FormCreate() {
  const {
    showPopup,
    buttonIcon,
    filename,
    creator,
    image,
    handleShowPopup,
    handleFilenameChange,
    handleCreatorChange,
    handleImageChange,
    handleSubmit,
  } = useChrome();
  const [shouldRender, setShouldRender] = useState(showPopup);
 
  useEffect(() => {
   
    if (showPopup) {
      setShouldRender(true);
    } else {
      // Delay unmounting the component to allow the fade-out transition to complete
      const timeoutId = setTimeout(() => {
        setShouldRender(false);
      }, 400); // Adjust the timeout duration as needed to match your transition duration
      return () => clearTimeout(timeoutId);
    }
  }, [showPopup]);

  
  const handleCancle = () => {
    handleFilenameChange("")
    handleCreatorChange("")
    handleImageChange("")
    handleShowPopup(false);
  };


  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          handleImageChange(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const onHandleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newItem:IPropertiesCard={
      id: nextId++,
      filename,
      creator,
      image,
    }
    handleSubmit(newItem);
    handleCancle();
  };

  const handleRemoveImg = () => {
    handleImageChange("");
  }

  return shouldRender ? (
    <div
      className={`w-full h-[100vh] absolute top-0 bg-bgPopUp flex justify-center items-center ${
        showPopup ? "opacity-100" : "opacity-0 pointer-events-none"
      } transition-opacity duration-300`}
    >
      <div className=" flex flex-col gap-7 bg-blue-300 px-10 py-10 rounded-xl shadow-2xl">
        <div className=" text-2xl font-bold text-center">
          {buttonIcon ? "Update Card Download" : "Creat Card Download"}
        </div>
        <div>
          <form onSubmit={onHandleSubmit} className=" flex flex-col gap-4">
            <div className=" flex justify-between items-center">
              <label htmlFor="filename" className=" font-semibold mr-22">
                Filename
              </label>
              <input
                type="text"
                name="filename"
                value={filename}
                onChange={(e)=> handleFilenameChange(e.target.value)}
                required
                className=" w-72 px-2 py-2 rounded-lg bg-slate-200 outline-blue-700"
              />
            </div>
            <div>
              <label htmlFor="creator" className=" font-semibold mr-[6.5rem]">
                Creator
              </label>
              <input
                type="text"
                name="creator"
                value={creator}
                onChange={(e)=>handleCreatorChange(e.target.value)}
                required
                className=" w-72 px-2 py-2 rounded-lg bg-slate-200 outline-blue-700"
              />
            </div>
            <div>
              <label htmlFor="image" className=" font-semibold mr-28">
                Image
              </label>
              <input
                type="file"
                onChange={handleImage}
                id="image"
                className=" w-72 px-2 py-2 rounded-lg bg-slate-200 outline-blue-700"
              />
              <div className=" relative">
                <img src={image} alt="Uploaded" className="w-18 h-16 mt-9 ml-8" />
                <div className=" absolute -top-1 left-24">
                  <MdClear
                    size={20}
                    onClick={handleRemoveImg}
                    className=" hover:bg-slate-300 rounded-full"
                  />
                </div>
              </div>
            </div>
            <div className=" flex justify-end">
              <button
                onClick={handleCancle}
                className="block bg-rose-500 px-6 py-2 rounded-xl text-white font-semibold mr-3"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="block bg-blue-700 px-6 py-2 rounded-xl text-white font-semibold"
              >
                {buttonIcon ? "Update" : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  ) : null;
}

export default FormCreate