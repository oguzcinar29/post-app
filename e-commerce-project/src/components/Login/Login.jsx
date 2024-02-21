import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useData } from "../Context/DataContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setExitClicked } = useData();

  const getLogin = (email, password) => {
    fetch("/https://post-app-ab2l.onrender.com/api/get-user-info", {
      method: "POST",
      headers: {
        "Contact-type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    })
      .then((response) => response.json())
      .then((cas) => console.log(cas));
  };

  return (
    <div className="form-container">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          getLogin(email, password);
        }}
        className="form"
      >
        <div className="box">
          <label>Email: </label>
          <input
            title="A name cannot contain irregular characters"
            pattern=".{1,}"
            required
            placeholder="Type Email"
            type="text"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="box">
          <label>Password: </label>
          <input
            placeholder="Type Password"
            title="A name cannot contain irregular characters"
            pattern=".{1,}"
            required
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <input type="submit" value="Login" id="login" />
      </form>
      <div className="login-register-box">
        <h5>You have no account ? </h5>
        <Link to="/https://post-app-ab2l.onrender.com/register">
          Create one
        </Link>
      </div>
    </div>
  );
}
