import React from "react";
import { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const { RegisterUser } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    RegisterUser(username, password, password2);
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="border rounded items-center flex-col p-6"
      >
        <h1 className="font-bold text-center text-3xl">Register</h1>
        <input
          type="text"
          placeholder="Username"
          className="input input-bordered w-full max-w-xs m-2"
          name="username"
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <br />

        <input
          type="password"
          placeholder="Password"
          className="input input-bordered w-full max-w-xs m-2"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />

        <input
          type="password"
          placeholder="Repeat Password"
          className="input input-bordered w-full max-w-xs m-2"
          name="password2"
          onChange={(e) => setPassword2(e.target.value)}
          required
        />
        <button type="submit" className="btn justify-self-center self-center">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
