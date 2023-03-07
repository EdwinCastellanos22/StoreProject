import React from "react";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const Login = () => {
  const { loginUser } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;

    username.length > 0 && loginUser(username, password);
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="border rounded p-6 justify-center">
        <h1 className="text-center font-bold text-3xl">Login</h1>

        <input
          type="text"
          placeholder="Username"
          className="input input-bordered w-full max-w-xs m-2"
          name="username"
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="input input-bordered w-full max-w-xs m-2"
          name="password"
          required
        />
        <br />
        <button type="submit" className="btn self-center">Login</button>
      </form>
    </div>
  );
};

export default Login;
