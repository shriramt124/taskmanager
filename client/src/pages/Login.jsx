import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

function Login() {
  const [data, setDate] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  if (isLoggedIn === true) {
    navigate("/");
  }

  const submit = async (e) => {
    e.preventDefault();
    try {
      if (data.email === "" || data.password === "") {
        alert("all fields are required");
      } else {
        const response = await axios.post(
          "http://localhost:2000/api/v1/login",
          data
        );
        console.log(response.data);

        navigate("/");
        setDate({ email: "", password: "" });
        localStorage.setItem("id", response.data.id);
        localStorage.setItem("token", response.data.token);
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };
  const change = (e) => {
    setDate({ ...data, [e.target.name]: e.target.value });
  };
  console.log(data);
  return (
    <div className="sm:w-2/6  w-5/6 flex flex-col text-center m-auto mt-10 bg-gray-300 rounded-lg p-4">
      <h2 className="font-bold text-4xl capitalize my-8">Login</h2>
      <form className="flex flex-col gap-8" onSubmit={submit}>
        <div className="wrapper bg-gray-400 rounded w-full">
          <input
            type="email"
            name="email"
            placeholder="email.."
            className="w-full p-3 text-xl bg-gray-400 rounded-md outline-none"
            value={data.email}
            onChange={change}
          />
        </div>

        <div className="wrapper bg-gray-400 rounded-md w-full">
          <input
            type="password"
            name="password"
            placeholder="password.."
            className="w-full p-3 text-xl bg-gray-400  outline-none"
            value={data.password}
            onChange={change}
          />
        </div>
        <div className="wrapper">
          <button className="w-full my-4 bg-gray-400 p-4 text-xl rounded-md hover:bg-gray-600 ">
            Login
          </button>
        </div>
      </form>
      <div className="links">
        <span className="capitalize text-gray-400">
          don't have any account ?{" "}
          <Link to="/signup" className="text-blue-500">
            signup
          </Link>
        </span>
      </div>
    </div>
  );
}

export default Login;
