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
  const [Data,setData] = useState();

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
        {headers:headers}
        
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
     {Data && <div>
        <h2 className="text-xl">{Data.username}</h2>
        <h4 className="my-2 text-gray-500">{Data.email}</h4>
        <hr />
      </div>}
      <div>
        {data.map((item, i) => (
          <Link
            to={item.link}
            key={i}
            className="my-2 flex items-center  gap-2 capitalize hover:bg-gray-600 cursor-pointer p-2 rounded-md transition-all duration-300"
          >
            {item.icon}
            {item.title}
          </Link>
        ))}
      </div>
      <div>
        <button className="bg-gray-600 w-full p-2 rounded" onClick={logout}>
          Log Out
        </button>
      </div>
    </>
  );
};

export default Sidebar;
