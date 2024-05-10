import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoAddCircleSharp } from "react-icons/io5";




function Cards({ isHome, setInputdiv, data, setUpdatedData,isChanged,setIsChanged }) {

 
  const handleClick = () => {
    setInputdiv("fixed");
    setIsChanged(prev => !prev);
  };



  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };



  const handleComplete = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:2000/api/tasks/update-complete-task/${id}`,
        {},
        { headers }
      );
      console.log(response);
      setIsChanged(prev => !prev);
    } catch (error) {
      console.log(error);
    }
  };



  const handleImportantTask = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:2000/api/tasks/update-imp-task/${id}`,
        {},
        { headers }
      );
      console.log(response);
      setIsChanged(prev => !prev);
    } catch (error) {
      console.log(error);
    }
  };



  const deleteTask = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:2000/api/tasks/delete-task/${id}`,
        { headers }
      );
      console.log(response);
      setIsChanged(prev => !prev);
    } catch (error) {
      console.log(error);
    }
  };



  const handleUpdate = (id, title, desc) => {
    setInputdiv("fixed");
    setUpdatedData({ id: id, title: title, desc: desc });
    setIsChanged(prev => !prev);
  };


 

  return (
    <div className="flex gap-2 flex-wrap">
      {data &&
        data.map((items, i) => (
          <div
            className="w-[300px] sm:w-[400px] bg-gray-700 p-4 rounded-md"
            key={Math.random() * 10}
          >
            <div key={i}>
              <h2 className="text-xl">{items.title}</h2>
              <p>{items.desc}</p>
            </div>
            <div className="mt-4 flex gap-2  p-2">
              <button
                className={`${
                  items.complete === true
                    ? "bg-green-400 p-2 rounded-sm"
                    : "bg-red-500 p-2 rounded-sm"
                }`}
                onClick={() => handleComplete(items._id)}
              >
                {items.complete === true ? "completed" : "incompleted"}
              </button>
              <div className="flex gap-1 ">
                <button
                  className={`${
                    items.important === true
                      ? "bg-red-500 p-2"
                      : "bg-gray-500 p-2"
                  }`}
                  onClick={() => handleImportantTask(items._id)}
                >
                  important
                </button>
                {isHome && (
                  <button
                    className="bg-gray-500 p-2"
                    onClick={() =>
                      handleUpdate(items._id, items.title, items.desc)
                    }
                  >
                    update
                  </button>
                )}
                <button
                  className="bg-gray-500 p-2"
                  onClick={() => deleteTask(items._id)}
                >
                  delete
                </button>
              </div>
            </div>
          </div>
        ))}
      {isHome && (
        <div
          onClick={handleClick}
          className="flex flex-col p-2 bg-gray-700 w-[300px] sm:w-[400px] rounded-md items-center hover:translate-x-5 transition-all duration-500 cursor-pointer"
        >
          <IoAddCircleSharp className="text-6xl items-center" />
          <h2 className="text-2xl text-gray-500 items-center">Add task</h2>
        </div>
      )}
    </div>
  );
}

export default Cards;
