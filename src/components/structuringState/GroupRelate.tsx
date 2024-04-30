import{useState } from 'react'

interface  StudentType {
  id: number;
  name: string;
  age: number;
}

const GroupRelate:React.FC<StudentType> = () => {
  const [studens, setStudent] = useState<StudentType[]>([
    {id: 1, name: 'sok', age:20},
    {id: 2, name: 'dara', age:21},
    {id: 3, name: 'deny', age:22},
  ])

  const handleChangeStudent = (id:number, newItem:Partial<StudentType>) => {
    setStudent(
      studens.map(student => {
        if (student.id === id) {
          return {
           ...student,
           ...newItem
          }
        }
        return student
      })
    )
  }
  return (
    <div>
         {
           studens.map(student => {
             return (
               <div key={student.id} className=' flex gap-5 mb-2 m-4'>
                 <h1>{student.name}</h1>
                 <h2>{student.age}</h2>
                 <button onClick={() => handleChangeStudent(student.id, {name: 'sao',age: 30})} className=' py-2 px-4 bg-red-500 rounded-xl text-white'>Change Age</button>
               </div>
             )
           })
         }

    </div>
  )
}

export default GroupRelate