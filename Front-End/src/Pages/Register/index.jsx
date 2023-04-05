import { useState } from "react";
import { createUser } from "./../../Model/users.Model";
import { addUser, login, setError } from "./../../REDUX/Slices/users.Slice";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import setItems from './../../REDUX/Storage/setItems'
import Notifi from "./../../Components/Notifi";
import "./index.scss";

export default function Register() {
  const [user, setUser] = useState({
    user_name: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });
  const [notification, setNotification] = useState();

  const err = useSelector((state) => state.error);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value.toLowerCase() });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createUser(user)
      .then((res) => {
        const user = {...res.data.user}
        dispatch(
          addUser({
            token: user.token,
            response: user.response
          })
        );
        setNotification(
          <Notifi
            className={"success"}
            header={"Successfully"}
            message={"You Have Registered Successfully!"}
          />
        );
        setItems(user)
        setTimeout(() => {
          dispatch(login());
        }, 1000);
      })
      .catch(() => {
        dispatch(setError(`Email or Username Already Exist, Try Again!`));
        setNotification(
          <Notifi
            className={"error"}
            header={"Error Register"}
            message={"Email or Username Already Exist!"}
          />
        );
      });
  };

  return (
    <div className="register-Page">
      <div className="container">
        {notification}
        <div className="row">
          <h2>
            Register to <Link to="/">Notes</Link>
          </h2>
          <span>Explore How Other's Think.</span>
          <div className="register-Background">
            <img src="./SVGs/register.svg" alt="Register" />
          </div>
          <hr />
          <div className="register-Form">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="user_name"
                placeholder="Username"
                value={user.user_name}
                required
                onChange={handleChange}
              />
              <input
                type="text"
                name="first_name"
                placeholder="First Name"
                value={user.first_name}
                required
                onChange={handleChange}
              />
              <input
                type="text"
                name="last_name"
                placeholder="Last Name"
                value={user.last_name}
                required
                onChange={handleChange}
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={user.email}
                required
                onChange={handleChange}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={user.password}
                required
                onChange={handleChange}
              />
              <button type="Submit">Register</button>
            </form>
            <p>
              Already Have Account? <Link to="/login">Login</Link>
              {err && <span className="err">{err}</span>}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
