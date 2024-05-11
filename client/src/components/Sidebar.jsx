import React, { useEffect, useState } from "react";
import { MdNotes } from "react-icons/md";
import { MdLabelImportant } from "react-icons/md";
import { FaCheckDouble } from "react-icons/fa6";
import { FaRegCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { authActions } from "../store/auth";
import { useDispatch } from "react-redux";
import axios from "axios";

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [Data, setData] = useState();

  const data = [
    {
      title: "all tasks",
      icon: <MdNotes />,
      link: "/",
    },
    {
      title: "important tasks",
      icons: <MdLabelImportant />,
      link: "/importantTasks",
    },
    {
      title: "completed tasks",
      icon: <FaCheckDouble />,
      link: "/completedTasks",
    },
    {
      title: "incompleted tasks",
      icon: <FaRegCircle />,
      link: "/incompletedTasks",
    },
  ];

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };


  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "http://localhost:2000/api/tasks/all-tasks",
        { headers: headers }
      );
      setData(response.data.data);
    };
    fetch();
  }, []);


  const logout = () => {
    dispatch(authActions.logout());
    localStorage.clear("id");
    localStorage.clear("token");
    navigate("/login");
  };


  return (
    <>
    <div className="flex justify-between  px-2 md:px-4 py-4  shadow-gray-600 mb-6 items-center"> 
    <div className="logo text-3xl ">Task Manager</div>
    <div className="flex gap-2 sm:gap-4 md:gap-6 justify-center items-center"> 
    <div className="text-center items-center m-auto">
        <button onClick={logout} className="bg-orange-500 p-3 rounded-md text-white text-md sm:text-xl ">Log Out</button>
      </div>
      {Data && (
        <div>
          <h2 className="text-md  sm:text-xl md:text-2xl capitalize bg-orange-500 rounded-md  text-white p-2" >{Data.username}</h2>
        </div>
      )}
       
      </div>
      </div>
      <div className="flex gap-4 px-6 overflow-x-auto mb-4">
        {data.map((item, i) => (
          <Link to={item.link} key={i} className="text-xl capitalize p-4 rounded-md hover:bg-orange-400 hover:text-white transition-all duration-300">
            {item.title}
          </Link>
        ))}
      </div>
      
    </>
  );
};

export default Sidebar;
