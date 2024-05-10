import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

function Signup() {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  if (isLoggedIn === true) {
    navigate("/");
  }
  const [data, setData] = useState({ username: "", email: "", password: "" });
  const change = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  console.log(data);
  const submit = async (e) => {
    e.preventDefault();
    try {
      if (data.username === "" || data.email === "" || data.password === "") {
        alert("all fields are required");
      } else {
        const response = await axios.post(
          "http://localhost:2000/api/v1/sign-up",
          data
        );

        alert(response.data.message);
        navigate("/login");
        setData({ username: "", email: "", password: "" });
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };
  return (
    <div className="sm:w-4/6  w-5/6 flex flex-col text-center m-auto mt-10 bg-gray-800 rounded-lg p-4">
      <h2 className="font-bold text-4xl capitalize my-8">Signup</h2>
      <form className="flex flex-col gap-8" onSubmit={submit}>
        <div className="wrapper bg-gray-700 rounded w-full">
          <input
            type="text"
            name="username"
            placeholder="username.."
            className="w-full p-3 text-xl bg-gray-700 rounded-md outline-none"
            value={data.username}
            onChange={change}
          />
        </div>
        <div className="wrapper bg-gray-700 rounded-md w-full">
          <input
            type="email"
            name="email"
            placeholder="email.."
            className="w-full p-3 text-xl bg-gray-700 outline-none"
            onChange={change}
            value={data.email}
          />
        </div>
        <div className="wrapper bg-gray-700 rounded-md w-full">
          <input
            type="password"
            name="password"
            placeholder="password.."
            className="w-full p-3 text-xl bg-gray-700  outline-none"
            onChange={change}
            value={data.password}
          />
        </div>
        <div className="wrapper">
          <button className="w-full my-4 bg-gray-700 p-4 text-xl rounded-md hover:bg-gray-600 ">
            Signup
          </button>
        </div>
      </form>
      <div className="links">
        <span className="capitalize text-gray-400">
          alredy have an account ?{" "}
          <Link to="/login" className="text-blue-500">
            Login
          </Link>
        </span>
      </div>
    </div>
  );
}

export default Signup;
