import React, { useState } from "react";
import Child1 from "./Child1";
import Child2 from "./Child2";

const Parent: React.FC = () => {
  const [sharedData, setSharedData] = useState<string>("");

  const handleDataChange = (newData: string) => {
    setSharedData(newData);
  };
  return (
    <>
      <div>
        <Child1 onClickChange={handleDataChange} />
        <Child2 sharedData={sharedData} />
      </div>
    </>
  );
};

export default Parent;
