import React from 'react'

interface Book{
    id:number;
    title:string;
    author:string;
  }
  

const Listing:React.FC = () => {

    let books:Book[] = [
        {id:1, title:"Rean Dek", author:"Sok"},
        {id:2, title:"Garlic", author:"Dara"},
        {id:3, title:"Design", author:"Deny"},
        {id:4, title:"Nodejs", author:"Sara"},
        {id:5, title:"Nextjs", author:"Vit"},
        {id:6, title:"Python", author:"Vireak"},
        {id:7, title:"C# OOP", author:"Sari"},
        {id:8, title:"Java Script", author:"Bro json"},
      ]

  return (
    <>
        <div>
           { 
             books.map((book) => {
               return (
                 <div key={book.id} className=' bg-slate-200 py-3 px-3 w-3/5 rounded-xl mb-6 mx-auto'>
                   {/* <h1 className=' font-bold'>ID: {book.id}</h1>
                   <h1>Title: {book.title}</h1>
                   <h2>Author: {book.author}</h2> */}
                 </div>
               )
             })
           }
        </div>
    </>
  )
}

export default Listing;