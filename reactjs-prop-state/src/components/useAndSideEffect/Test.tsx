import React, { useEffect, useState } from "react";

type Props = {};

const Test = () => {
  const [count, setCount] = useState<number>(0);
  const [name, setName] = useState<string>("Da");
  const [value, setValue] = useState<number>(0);

  // useEffect(() => {
  //     //Runs on every render
  //     console.log("useEffect is called")
  // });

  useEffect(() => {
    //Runs only on the first render
    console.log("useEffect is called");
  }, []);

  //render depen on dependencies
  // useEffect(() => {
  //     console.log('useEffect')
  // },[count,name])

  const handleClick = () => {
    setCount(count + 1);
  };
  const handleChangeName = () => {
    setName("Sok");
  };
  const handleChangeValue = () => {
    setValue(value + 2);
  };
  return (
    <>
      <div className=" flex gap-3 justify-center items-center">
        <div className=" flex flex-col items-center gap-2">
          <h3 className=" font-semibold">{count}</h3>
          <button
            onClick={handleClick}
            className=" bg-blue-400 py-2 px-4 rounded-xl text-white"
          >
            Increase
          </button>
        </div>
        <div className=" flex flex-col items-center gap-2">
          <h3 className=" font-semibold">{name}</h3>
          <button
            onClick={handleChangeName}
            className=" bg-red-400 py-2 px-4 rounded-xl text-white"
          >
            Change Name
          </button>
        </div>
        <div className=" flex flex-col items-center gap-2">
          <h3 className=" font-semibold">{value}</h3>
          <button
            onClick={handleChangeValue}
            className=" bg-green-400 py-2 px-4 rounded-xl text-white"
          >
            Change Value
          </button>
        </div>
      </div>
    </>
  );
};

export default Test;
