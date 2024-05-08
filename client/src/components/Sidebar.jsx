import React from 'react'
import { MdNotes} from "react-icons/md"
import {MdLabelImportant} from "react-icons/md"
import {FaCheckDouble} from "react-icons/fa6"
import { FaRegCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';


const Sidebar = () => {
  const data = [
    {
      title:'all tasks',
      icon:<MdNotes />,
      link:"/"
    },
    {
      title:'important tasks',
      icons:<MdLabelImportant />,
      link:"/importantTasks"
    },
    {
      title:'completed tasks',
      icon:<FaCheckDouble />,
      link:"/completedTasks"
    },
    {
      title:'incompleted tasks',
      icon:<FaRegCircle />,
      link:"/incompletedTasks"
    },
  ]
  return (
    <> 
        <div>
          <h2 className='text-xl'>shriram tiwari</h2>
        <h4 className='my-2 text-gray-500'>shriramt.124@gmail.com</h4>
        <hr />
        </div>
        <div>
          {
            data.map((item,i)=>(
               <Link to={item.link} key={i} className='my-2 flex items-center  gap-2 capitalize hover:bg-gray-600 cursor-pointer p-2 rounded-md transition-all duration-300'>{item.icon}{item.title}</Link>
            ))
          }
        </div>
        <div>
          <button className='bg-gray-600 w-full p-2 rounded'>
            Log Out
          </button>
        </div>
   
    </>
  )
}

export default Sidebar