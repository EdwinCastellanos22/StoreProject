import React from "react";

const UserInfo = ({ user }) => {
  return (
    <div>
      <h1>Hola {user.username}</h1>
    </div>
  );
};

export default UserInfo;
