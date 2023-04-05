import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { setLoading, logout } from "./../../REDUX/Slices/users.Slice";
import { profileNotes } from "./../../Model/notes.Model";
import { getUser } from "./../../Model/users.Model";
import AddImage from "./../../Components/AddImage";
import Skeleton from "./../../Components/Skeleton";
import "./index.scss";

export default function Profile() {
  const { id } = useSelector((state) => state.userData);
  const loading = useSelector((state) => state.isLoading);
  const [user, setUser] = useState({
    user_name: "",
    first_name: "",
    last_name: "",
    email: "",
    image: "",
  });
  const [notes, setNotes] = useState([]);
  const [className, setClassName] = useState("hidden");
  const userId = useParams().id;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    getUser(userId)
      .then((res) => {
        setUser(res.data.user);
      })
      .catch(() => {
        alert(`Error Get User With id ${userId}`);
        navigate("/");
      });
    profileNotes(userId)
      .then((res) => {
        setNotes(res.data.notes);
        dispatch(setLoading(false));
      })
      .catch(() => {
        alert(`Error Get Notes`);
        dispatch(logout())
      });
    setTimeout(() => {
      if (user.image === "" && userId == id) {
        setClassName("add-Image");
      } else {
        setClassName("hidden");
      }
    }, 2000);
  }, []);

  return (
    <div className="profile-Page">
      <div className="container">
        <div className="row">
          <div className="profile-Image">
            <img src={user.image ? user.image : "./../SVGs/avatar.svg"} />
          </div>
          <div className="profile-Content">
            <header>
              <h2>
                {user.first_name} {user.last_name}
              </h2>
              <p>{user.user_name}</p>
            </header>
            <div className="about-Content">
              <p>
                <span>Short_Brief_About_Yourself:</span>&nbsp;
                <span contentEditable>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit
                  odio dolorem totam minima laboriosam, ipsam nihil provident.
                  Voluptate distinctio sed, quam sunt aspernatur unde
                  dignissimos itaque commodi dolore, minima deleniti.
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="notes-Archive">
          <div className="row">
            {loading ? (
              <Skeleton />
            ) : ( notes.length > 0 ?
              notes.map((note, index) => {
                return (
                  <div className="note-Box" key={index}>
                    <i className="fa-solid fa-quote-right"></i>
                    <h2>{note.text}</h2>
                    <p>{note.note}</p>
                    <i className="fa-solid fa-quote-left"></i>
                  </div>
                );
              })
            : <h2>No Notes Yet.</h2>)}
          </div>
          {id == userId && <Link to="/notes">All Notes</Link>}
        </div>
        <AddImage className={className} />
      </div>
    </div>
  );
}
