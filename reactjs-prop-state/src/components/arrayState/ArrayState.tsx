
import React, { useState } from 'react';

type StudentType = {
  id: number;
  name: string;
};

const ArrayState: React.FC = () => {
  const [id, setId] = useState<number>(1); // Add state for id
  const [name, setName] = useState<string>('');
  const [listStudent, setListStudent] = useState<StudentType[]>([]);

  const handleAddStudentName = (id: number) => {
    const existingStudent = listStudent.find(student => student.id === id);
    
    if (existingStudent) {
      // Update existing student's name
      setListStudent(
        listStudent.map(student =>
          student.id === id ? { ...student, name: name } : student
        )
      );
      setId(0)
    } else {
      // Add new student to the list
      setListStudent([
        ...listStudent,
        { id: id, name: name }
      ]);
      setId(id + 1); // Increment id for the next student
    }
    setName(''); // Reset name input
  };


  const handleRemoveStudent = (idToRemove: number) => {
    setListStudent(listStudent.filter(student => student.id !== idToRemove));
  };

  const handleGetData = (id:number, name:string) => {
    setId(id); 
    setName(name);
  };


  return (
    <>
      <div>
        <label htmlFor="id">ID:</label>
        <input type="number" name="id" value={id} onChange={(e) => setId(parseInt(e.target.value))} className=' border-2'/>
      </div>
      <div>
        <label htmlFor="name">Name:</label>
        <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} className=' border-2 mt-2'/>
      </div>
      <button onClick={() => handleAddStudentName(id)} className=' bg-blue-600 px-4 py-2 rounded-xl text-white mt-2'>Save</button>

      <h2 className=' text-2xl font-semibold'>List all Students:</h2>
      <ul>
        {listStudent.map(student => (
          <li key={student.id} className=' mt-2'>
            <input
              type="text"
              value={student.name}
              
            />
            <button className=' bg-green-400 px-4 py-1 rounded-xl text-white mr-3' onClick={()=>handleGetData(student.id, student.name)} > Edit</button>
            <button onClick={() => handleRemoveStudent(student.id)} className=' bg-red-600 px-4 py-1 rounded-xl text-white'>Remove</button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ArrayState;

