import React, { useEffect, useState } from "react";
import "./Header.css";
// import { useState } from 'react/cjs/react.production.min'

const Header = () => {
  const [user, setUser] = useState("");

  useEffect(() => {
    const getUser = async () => {
      await fetch("https://assessment.api.vweb.app/user")
        .then((res) => res.json())
        .then((user) => setUser(user))
        .catch((error) => console.log(error));
    };
    getUser();
  }, []);

  return (
    <div className="headerContainer">
      <div className="headerLogo">Edvora</div>
      <div className="profile">
        <p>{user.name} </p>
        <img src={user.url} alt="profile" />
      </div>
    </div>
  );
};

export default Header;
