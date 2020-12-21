import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

export const Register = ({ authorized }) => {
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const history = useHistory();

  useEffect(() => {
    if (authorized) history.push("/login");
  }, [authorized]);

  function handleSubmit(e) {
    e.preventDefault();

    let errors = {};

    if (username.length < 4)
      errors = {
        username: "Minimum 4 characters.",
      };

    if (firstName.length > 1) {
      if (!firstName.match(/^[A-Za-z]+$/))
        errors = {
          ...errors,
          firstName: "First Name can only contain letters.",
        };
    } else errors = { ...errors, firstName: "Minimum 2 characters." };

    if (lastName.length > 4) {
      if (!lastName.match(/^[A-Za-z]+$/))
        errors = {
          ...errors,
          lastName: "Last Name can only contain letters.",
        };
    } else errors = { ...errors, lastName: "Minimum 5 characters." };

    if (!email.match(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/))
      errors = {
        ...errors,
        email: "The email must be a valid emaild address.",
      };

    if (password.length < 4)
      errors = {
        ...errors,
        password: "Minimum 4 characters.",
      };

    if (Object.keys(errors).length) {
      setErrors(errors);
    } else {
      axios
        .get(
          `https://jsonbox.io/box_05a8c03e885bb14a9af9?q=username:${username}`
        )
        .then((res) => {
          if (res.data.length === 0) {
            axios
              .post("https://jsonbox.io/box_05a8c03e885bb14a9af9", {
                username: username,
                password: password,
                email: email,
                firstName: firstName,
                lastName: lastName,
              })
              .then(() => history.push("/login"))
              .catch((res) => console.error(res));
          } else {
            setErrors({
              username: "Username already exists.",
            });
          }
        })
        .catch((res) => console.error(res));
    }
  }

  if (!authorized)
    return (
      <form onSubmit={handleSubmit}>
        <h1>Login Form </h1>

        <div className="form-group">
          <input
            value={username}
            style={{
              borderColor: errors.hasOwnProperty("username") ? "red" : null,
            }}
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            name="username"
            placeholder="Username"
          />

          {errors.hasOwnProperty("username") ? (
            <p style={{ color: "red" }}>{errors.username}</p>
          ) : null}
        </div>

        <div className="form-group">
          <input
            value={firstName}
            style={{
              borderColor: errors.hasOwnProperty("firstName") ? "red" : null,
            }}
            type="text"
            onChange={(e) => setFirstName(e.target.value)}
            name="firstName"
            placeholder="First Name"
          />

          {errors.hasOwnProperty("firstName") ? (
            <p style={{ color: "red" }}>{errors.firstName}</p>
          ) : null}
        </div>

        <div className="form-group">
          <input
            value={lastName}
            style={{
              borderColor: errors.hasOwnProperty("lastName") ? "red" : null,
            }}
            type="text"
            onChange={(e) => setLastName(e.target.value)}
            name="lastName"
            placeholder="Last Name"
          />

          {errors.hasOwnProperty("lastName") ? (
            <p style={{ color: "red" }}>{errors.lastName}</p>
          ) : null}
        </div>

        <div className="form-group">
          <input
            value={email}
            style={{
              borderColor: errors.hasOwnProperty("email") ? "red" : null,
            }}
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            placeholder="Email"
          />

          {errors.hasOwnProperty("email") ? (
            <p style={{ color: "red" }}>{errors.email}</p>
          ) : null}

          <div className="form-group">
            <input
              value={password}
              style={{
                borderColor: errors.hasOwnProperty("password") ? "red" : null,
              }}
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              placeholder="Password"
            />

            {errors.hasOwnProperty("password") ? (
              <p style={{ color: "red" }}>{errors.password}</p>
            ) : null}
          </div>
        </div>

        <button type="submit">Submit</button>
      </form>
    );
  return null;
};

export const Login = ({ authorized, setAuthorized, user, setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  function handleSubmit(e) {
    e.preventDefault();

    let errors = {};

    if (username.length === 0)
      errors = {
        username: "Please fill out this field",
      };

    if (password.length === 0)
      errors = {
        ...errors,
        password: "Please fill out this field",
      };

    if (Object.keys(errors).length) {
      setErrors(errors);
    } else {
      axios
        .get(
          `https://jsonbox.io/box_05a8c03e885bb14a9af9?q=username:${username},password:${password}`
        )
        .then((res) => {
          if (res.data.length) {
            localStorage.setItem("user", res.data[0]._id);
            setUser(res.data[0]);
            setAuthorized(true);
          } else
            setErrors({
              incorrect: "Incorrect username or password",
            });
        })
        .catch((res) => console.error(res));
    }
  }

  if (!authorized)
    return (
      <form onSubmit={handleSubmit}>
        <h1>Login Form </h1>

        <div className="form-group">
          <input
            value={username}
            style={{
              borderColor: errors.hasOwnProperty("username") ? "red" : null,
            }}
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            name="username"
            placeholder="Username"
          />

          {errors.hasOwnProperty("username") ? (
            <p style={{ color: "red" }}>{errors.username}</p>
          ) : null}
        </div>

        <div className="form-group">
          <input
            value={password}
            style={{
              borderColor: errors.hasOwnProperty("password") ? "red" : null,
            }}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            placeholder="Password"
          />

          {errors.hasOwnProperty("password") ? (
            <p style={{ color: "red" }}>{errors.password}</p>
          ) : null}
        </div>

        {errors.hasOwnProperty("incorrect") ? (
          <p style={{ color: "red" }}>{errors.incorrect}</p>
        ) : null}

        <button type="submit">Submit</button>
      </form>
    );

  console.log(user);

  return (
    <table className="profile">
      {Object.keys(user).map((item, index) => {
        return (
          <tr key={index}>
            <th>{item}</th>
            <td>{user[item]}</td>
          </tr>
        );
      })}
    </table>
  );
};
