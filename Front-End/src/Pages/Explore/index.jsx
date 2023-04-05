import { useState, useEffect } from "react";
import Planet from "./../../Components/Planet";
import { getNotes } from "./../../Model/notes.Model";
import { getUser, getUsers } from "./../../Model/users.Model";
import { logout } from './../../REDUX/Slices/users.Slice'
import { format, parseISO } from "date-fns";
import { useDispatch } from 'react-redux'
import { Link } from "react-router-dom";
import "./index.scss";

export default function Explore() {
  const [motion, setMotion] = useState(null);
  const [noteMotion, setNoteMotion] = useState(null);
  const [note, setNote] = useState({});
  const [user, setUser] = useState({});
  const [searchTerms, setSearchTerms] = useState({
    id: "",
    user_name: "",
    first_name: "",
    last_name: "",
    email: "",
    image: "",
  });
  const [hidden, setHidden] = useState("none");
  const dispatch = useDispatch()

  useEffect(() => {
    getNotes()
      .then((res) => {
        setNote(res.data.notes[0]);
    getUser(res.data.notes[0].user_id)
      .then((res) => {
        setUser(res.data.user);
        })
      })
      .catch(() => {
        alert(`Error Get Notes`);
        dispatch(logout())
      });
    setMotion("planet");
    setTimeout(() => {
      setMotion(null);
    }, 1000);
  }, []);

  const handleClick = () => {
    getNotes()
      .then((res) => {
        setNote(res.data.notes[0]);
        getUser(res.data.notes[0].user_id).then((res) => {
          setUser(res.data.user);
        });
      })
      .catch(() => {
        alert(`Error Get Note`);
        dispatch(logout())
      });
    setNoteMotion("fadein 0.7s ease-in-out");
    setMotion("planet");
    setTimeout(() => {
      setNoteMotion(null);
      setMotion(null);
    }, 1000);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setTimeout(() => {
    getUsers({username: value}).then((res) => {
      setSearchTerms(res.data.users);
      });
    }, 1000);
      if (value.length > 2) {
        setHidden("block");
      } else {
        setHidden("none");
      }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="explore-Page">
      <div className="container">
        <header>
          <h2>Expolre Notes</h2>
          <p>Let's Expolre How Other's Think.</p>
        </header>
        <div className="row">
          <div className="planet">
            <Planet motion={motion} />
          </div>
          <div className="explore-Content">
            <div className="search-Button">
              <form onSubmit={handleSubmit}>
                <i className="fa-light fa-search"></i>
                <input
                  type="text"
                  name="search"
                  placeholder="Search for User.."
                  onChange={handleChange}
                />
              </form>
            </div>
            <div className="search-Result" style={{ display: hidden }}>
              <Link to={`/profile/${searchTerms.id}`}>
                <img
                  src={
                    searchTerms.img != null
                      ? searchTerms.img
                      : `./SVGs/avatar.svg`
                  }
                  alt="Profile Image"
                />
                <p>
                  {searchTerms.first_name} {searchTerms.last_name}
                </p>
              </Link>
            </div>
            <div style={{ animation: noteMotion }}>
              <div className="others-Notes">
                <div className="big-Note">
                  <div className="user-thumbnail">
                    <img
                      src={user.image ? `${user.image}` : `./SVGs/avatar.svg`}
                      alt="Profile Image"
                    />
                    <p>
                      {user.first_name} {user.last_name}
                    </p>
                  </div>
                  <div className="user-note">
                    <i className="fa-solid fa-quote-right"></i>
                    <h2>{note.text}</h2>
                    <p>{note.note}</p>
                    <i className="fa-solid fa-quote-left"></i>
                    <span>
                      Created at:{" "}
                      {format(
                        note.created_date
                          ? parseISO(note.created_date)
                          : new Date(),
                        "yyyy-MM-dd"
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button onClick={handleClick}>More</button>
      </div>
    </div>
  );
}
