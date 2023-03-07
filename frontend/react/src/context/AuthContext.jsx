import React from "react";
import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(() => {
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null;
  });

  const [user, SetUser] = useState(() => {
    localStorage.getItem("authTokens")
      ? jwt_decode(localStorage.getItem("authTokens"))
      : null;
  });

  const [loading, SetLoading] = useState(true);

  const history = useHistory();

  const loginUser = async (username, password) => {
    const response = await fetch("http://127.0.0.1:8000/api/token/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    const data = await response.json();

    if (response.status === 200) {
      setAuthTokens(data);
      SetUser(jwt_decode(data.access));
      localStorage.setItem("authTokens", JSON.stringify(data));
      Swal.fire({
        icon: "success",
        title: "Hola",
        text: "Bienvenido de nuevo!",
      });
      history.push("/");
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Ah ocurrido un error!",
      });
    }
  };

  const RegisterUser = async (username, password, password2) => {
    const response = await fetch("http://127.0.0.1:8000/api/register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
        password2,
      }),
    });

    if (response.status === 201) {
      history.push("/login");
      Swal.fire({
        icon: "success",
        title: "Hecho",
        text: "Cuenta creada con exito!",
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Ah ocurrido un error!",
      });
    }
  };

  const logoutUser = () => {
    setAuthTokens(null);
    SetUser(null);
    localStorage.removeItem("authTokens");
    Swal.fire({
      icon: "info",
      title: "Has Salido exitosamente",
      text: "Hasta Luego!",
    });
    history.push("/login");
  };

  const contextData = {
    user,
    SetUser,
    authTokens,
    setAuthTokens,
    RegisterUser,
    loginUser,
    logoutUser,
  };

  useEffect(() => {
    if (authTokens) {
      SetUser(jwt_decode(authTokens.access));
    }
    SetLoading(false);
  }, [authTokens, loading]);

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
