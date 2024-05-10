import axios from "axios";
import React, { useEffect, useState } from "react";

function InputData({ inputdiv, setInputdiv, updatedData, setUpdatedData }) {
  const [Data, setData] = useState({ title: "", desc: "" });

  const handleClick = () => {
    setInputdiv("hidden");
    setUpdatedData({ id: "", title: "", desc: "" });
    setData({ title: "", desc: "" });
  };

  const change = (e) => {
    setData({ ...Data, [e.target.name]: e.target.value });
  };

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const submitData = async (e) => {
    e.preventDefault();
    if (Data.title === "" || Data.desc === "") {
      alert("Please fill all the fields");
    } else {
      const response = await axios.post(
        "http://localhost:2000/api/tasks/create-task",
        Data,
        { headers }
      );
      console.log(response);
      setData({ title: "", desc: "" });
      setInputdiv("hidden");
    }
  };
  const updateTask = async (id) => {
 
    if (Data.title === "" || Data.desc === "") {
      alert("Please fill all the fields");
    } else {
      const response = await axios.put(
        `http://localhost:2000/api/tasks/update-task/${updatedData.id}`,
        Data,
        { headers }
      );
      console.log(response);
      setUpdatedData({id:"",title:"",desc:""})
      setData({ title: "", desc: "" });
      setInputdiv("hidden");
    }
  };

  useEffect(() => {
    setData({ title: updatedData.title, desc: updatedData.desc });
  }, [updatedData]);
  return (
    <>
      <div
        className={` ${inputdiv} top-0 left-0 bg-gray-600 opacity-50 h-screen w-full`}
      ></div>

      <div
        className={`${inputdiv} top-0 left-0 w-full h-screen flex justify-center items-center`}
      >
        <div className="w-2/6 bg-gray-800 p-4 rounded-md">
          <button
            className="flex justify-end text-xl font-bold"
            onClick={handleClick}
          >
            close
          </button>
          <input
            value={Data.title}
            type="text"
            placeholder="title"
            name="title"
            onChange={change}
            className="w-full bg-gray-700 p-2 rounded-md outline-none my-3"
          />

          <textarea
            onChange={change}
            name="desc"
            id="desc"
            value={Data.desc}
            placeholder="description.."
            cols="30"
            rows="10"
            className="px-3 py-2 rounded w-full bg-gray-700 my-3"
          ></textarea>
          {updatedData.id === "" ? (
            <button
              className="px-3 py-2 bg-blue-400 text-xl font-semibold rounded-md"
              type="submit"
              onClick={submitData}
            >
              Submit
            </button>
          ) : (
            <button
              className="px-3 py-2 bg-blue-400 text-xl font-semibold rounded-md"
              type="submit"
              onClick={updateTask}
            >
              update
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default InputData;
