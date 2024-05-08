import React from "react";

interface Child1Props { 
  onClickChange: (newData: string) => void;
}

const  Child1: React.FC<Child1Props>  =({onClickChange }: Child1Props) => {
  const handleClick = () => {
    onClickChange("Hello from Child1");
  };
  return (
    <>
      <div className=" ml-4">
        <h1 className=" text-4xl font-bold ">Child Component1</h1>
        <button
          className=" mt-4 bg-rose-500 px-5 font-semibold py-4 rounded-xl text-yellow-50 hover:bg-red-400"
          onClick={handleClick}
        >
          Send Data to Child2
        </button>
      </div>
    </>
  );
}

export default Child1;
