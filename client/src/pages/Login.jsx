import React from "react";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="sm:w-2/6  w-5/6 flex flex-col text-center m-auto mt-10 bg-gray-800 rounded-lg p-4">
      <h2 className="font-bold text-4xl capitalize my-8">Login</h2>
      <form className="flex flex-col gap-8">
        <div className="wrapper bg-gray-700 rounded w-full">
          <input
            type="text"
            name="username"
            placeholder="username.."
            className="w-full p-3 text-xl bg-gray-700 rounded-md outline-none"
          />
        </div>
      
        <div className="wrapper bg-gray-700 rounded-md w-full">
          <input
            type="password"
            name="password"
            placeholder="password.."
            className="w-full p-3 text-xl bg-gray-700  outline-none"
          />
        </div>
        <div className="wrapper">
            <button className="w-full my-4 bg-gray-700 p-4 text-xl rounded-md hover:bg-gray-600 ">Login</button>
        </div>
      </form>
      <div className="links">
        <span className="capitalize text-gray-400">don't have any account ? <Link to="/signup" className="text-blue-500">signup</Link></span>
      </div>
    </div>
  );
}

export default Login;