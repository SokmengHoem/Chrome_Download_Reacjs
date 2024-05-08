import React, { useRef } from 'react';
import { GrUpdate } from 'react-icons/gr';
import { IoIosAddCircleOutline } from 'react-icons/io';

const MyComponent: React.FC = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleDragStart = (e: React.DragEvent<HTMLButtonElement>) => {
    e.dataTransfer.setData('text/plain', 'button');
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const data = e.dataTransfer.getData('text/plain');
    if (data === 'button') {
      console.log('Button dropped!');
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      className="relative"
      style={{ minHeight: '200px', border: '1px dashed #ccc' }} // Add styling to visually identify the drop area
    >
      <button
        ref={buttonRef}
        draggable
        onDragStart={handleDragStart}
        className="bg-blue-600 w-12 py-2 rounded-xl flex justify-center items-center absolute bottom-5 right-5 hover:bg-blue-500 transition-all duration-150"
      >
        <GrUpdate size={30} className="text-white" />
      </button>
    </div>
  );
};

export default MyComponent;
