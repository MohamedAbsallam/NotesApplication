import { useState } from "react";
import { update, logout } from "./../../REDUX/Slices/users.Slice";
import { useSelector, useDispatch } from "react-redux";
import { updateUser, deleteUser } from "./../../Model/users.Model";
import { Link, useNavigate } from "react-router-dom";
import Notifi from "./../../Components/Notifi";
import "./index.scss";

export default function Settings() {
  
  const { id, user_name, first_name, last_name, email, token } = useSelector(
    (state) => state.userData
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    user_name: user_name,
    first_name: first_name,
    last_name: last_name,
    email: email,
    password: "",
  });
  const [notification, setNotification] = useState();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value.toLowerCase() });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser(id, user)
      .then((res) => {
        const { password, ...others } = res.data.user;
        const userData = { ...others, token: token };
        dispatch(update({ response: userData, token: userData.token }));
        setNotification(
          <Notifi
            className={"success"}
            header={"Successfully"}
            message={"User Updated Successfully!"}
          />
        );
        setTimeout(() => {
          navigate("/");
        }, 1000);
      })
      .catch(() => {
        setNotification(
          <Notifi
            className={"error"}
            header={"Error Register"}
            message={"Error According Update User!"}
          />
        );
      });
  };

  const handleDelete = () => {
    deleteUser(id).then(() => {
      dispatch(logout());
    });
  };

  return (
    <div className="settings-Page">
      {notification}
      <div className="container">
        <header>
          <h2>Update Your Data</h2>
        </header>
        <div className="row">
          <div className="settings-Bg">
            <img src="./SVGs/settings.svg" alt="Settings" />
          </div>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="user_name"
              value={user.user_name}
              placeholder="Username"
              required
              onChange={handleChange}
            />
            <input
              type="text"
              name="first_name"
              value={user.first_name}
              placeholder="First Name"
              required
              onChange={handleChange}
            />
            <input
              type="text"
              name="last_name"
              value={user.last_name}
              placeholder="Last Name"
              required
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              value={user.email}
              placeholder="Email"
              required
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              value={user.password}
              placeholder="Password"
              required
              onChange={handleChange}
            />
            <div className="btns">
              <button type="submit">UPDATE</button>
              <button
                onClick={handleDelete}
                style={{ backgroundColor: "#f00" }}
              >
                DELETE
              </button>
              <Link
                onClick={() => dispatch(logout())}
                style={{ backgroundColor: "#333" }}
              >
                Logout
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
