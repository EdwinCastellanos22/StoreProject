import React from "react";
import { useContext } from "react";
import Userinfo from "../components/Userinfo";
import AuthContext from "../context/AuthContext";

const Home = () => {
  const { user } = useContext(AuthContext);

  return (
    <div>
      {user && <Userinfo user={user} />}
      <h1>Bienvenido a la pagina principal!</h1>
    </div>
  );
};

export default Home;
