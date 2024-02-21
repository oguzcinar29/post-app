import React, { useState } from "react";
import { useData } from "../Context/DataContext";

// think about how to set passwords to be same

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const { isPassSame } = useData();
  return (
    <div className="form-container">
      <form
        action={
          password === rePassword
            ? "https://post-app-ab2l.onrender.com/api/set-user-info"
            : "/register"
        }
        method="post"
        className="form"
      >
        <div className="box">
          {" "}
          <label>Username: </label>
          <input
            type="text"
            title="A name cannot contain irregular characters"
            pattern=".{1,}"
            required
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="box">
          <label>Email: </label>
          <input
            type="text"
            title="Please enter a valid email address"
            pattern=".+@.+" // Ensures the presence of "@" symbol
            required
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="box">
          <label>Password: </label>
          <input
            type="password"
            title="A name cannot contain irregular characters"
            pattern=".{1,}"
            required
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="box">
          <label>Password Again: </label>
          <input
            type="password"
            title="A name cannot contain irregular characters"
            pattern=".{1,}"
            required
            name="rePassword"
            value={rePassword}
            onChange={(e) => setRePassword(e.target.value)}
          />
        </div>
        {<input type="submit" value="Create your account" id="login" />}{" "}
      </form>
    </div>
  );
}
