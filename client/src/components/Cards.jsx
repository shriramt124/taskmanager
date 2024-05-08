import React from 'react'
import {IoAddCircleSharp} from "react-icons/io5"
function Cards({isHome,setInputdiv}) {
    const data = [
        {
            title:"this is a sample titel",
            description:"this is a description",
            status:'complete'
        },
        {
            title:"this is a sample titel",
            description:"this is a  and i want to descipbe it in more like a good person and i am shriram tiwari",
            status:"incomplete"
        },
        {
            title:"this is a sample titel",
            description:"i need to learn the basic cp from the good youtuve channel name luv and he really teached well",
            status:"complete"
        },
        {
            title:"this is a sample titel",
            description:"this is a description  this is a description",
            status:"incomplete"
        },
    ]
     const handleClick = ()=>{
        setInputdiv("fixed");
     }

  return (
    <div className='flex gap-2 flex-wrap'>
        {data && data.map((items,i)=>(
            <div className='w-[300px] sm:w-[400px] bg-gray-700 p-4 rounded-md' key={Math.random()*10}>
            <div key={i}>
                <h2 className='text-xl'>{items.title}</h2>
                <p>{items.description}</p>
            </div>
            <div className='mt-4 flex gap-2  p-2'>
                    <button className={`${items.status === "complete" ? "bg-green-400 p-2 rounded-sm" :"bg-red-500 p-2 rounded-sm"}` }>{items.status}</button>
                    <div className='flex gap-1 '>
                        <button className='bg-gray-500 p-2'>complete</button>
                        <button className='bg-gray-500 p-2'>update</button>
                        <button className='bg-gray-500 p-2'>delete</button>
                    </div>
                </div>
            </div>
        ))}
        {isHome &&  <div  onClick={handleClick} className="flex flex-col p-2 bg-gray-700 w-[300px] sm:w-[400px] rounded-md items-center hover:translate-x-5 transition-all duration-500 cursor-pointer">
        <IoAddCircleSharp  className='text-6xl items-center'/>
        <h2 className='text-2xl text-gray-500 items-center'>Add task</h2>
        
        
       </div>}
    </div>
  )
}

export default Cards