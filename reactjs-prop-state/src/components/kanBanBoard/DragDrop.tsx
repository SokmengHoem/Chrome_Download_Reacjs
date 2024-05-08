import React, { useState } from "react";
import PlusIcon from "../../icons/PlusIcon";
import { Column, Id } from "../../type";
import ColumnContainer from "./ColumnContainer";



const DragDrop = () => {
  const [columns, setColumns] = useState<Column[]>([])
  console.log(columns)
  return (
    <div className=" m-auto flex min-h-screen w-full items-center overflow-x-auto overflow-y-hidden px-[40px]">
      <div className=" m-auto flex gap-4">
          {columns.map((col)=>(
            <ColumnContainer key={col.id} column={col} deleteColumn={deleteColumn}/>
          ))}
      </div>
      <div className=" m-auto">
        <button
          onClick={() => { createNewColumn()}}
          className=" h-[60px] w-[350px] min-w-[350px] cursor-pointer rounded-lg bg-mainBackgroundColor border-2 border-columnBackgroundColor p-4 ring-rose-500 hover:ring-2 flex gap-2"
        >
          <PlusIcon />
          Add Column
        </button>
      </div>
    </div>
  );
  function createNewColumn() {
    const columnToAdd : Column = {
      id: generateId(),
      title: `Column ${columns.length +1}`,
    };

    setColumns([...columns, columnToAdd]);
  }
  function deleteColumn(id: Id) {
    setColumns(columns.filter((col) => col.id!== id));
  }
};

export default DragDrop;

function generateId() {
  return Math.floor(Math.random() * 10001);
}
