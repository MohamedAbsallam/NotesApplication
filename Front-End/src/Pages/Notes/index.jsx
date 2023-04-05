import { useState, useEffect } from "react";
import { userNotes, deleteNote } from "./../../Model/notes.Model";
import { useSelector, useDispatch } from "react-redux";
import AddNote from "./../../Components/AddNote";
import Notifi from "./../../Components/Notifi";
import "./index.scss";

export default function Notes() {
  const [hidden, setHidden] = useState(true);
  const [notes, setNotes] = useState([]);
  const [showNotes, setShowNotes] = useState(false);
  const [notification, setNotification] = useState();
  const [text, setText] = useState("");
  const [arrow, setArrow] = useState("fa-light fa-arrow-right");
  const userId = useSelector((state) => state.userData.id);

  const handleDelete = (id) => {
    deleteNote(id)
      .then(() => {
        setNotification(
          <Notifi
            className={"success"}
            header={"Successfully"}
            message={"Note Deleted Successfully!"}
          />
        );
      })
      .catch(() => {
        setNotification(
          <Notifi
            className={"error"}
            header={"Error"}
            message={"Error Deleting Note!"}
          />
        );
      });
  };

  useEffect(() => {
    if (showNotes === false) {
      setText("Notes");
      setArrow("fa-light fa-arrow-right");
    } else {
      setText("Back");
      setArrow("fa-light fa-arrow-left");
    }
  }, [showNotes]);

  useEffect(() => {
    userNotes(userId).then((res) => {
      setNotes(res.data.notes);
    })
  });

  return (
    <div className="notes-Page">
      <div className="container">
        <div className="row">
          {notification}
          <div
            className="box"
            style={{ display: showNotes === true ? "none" : "flex" }}
          >
            <i
              className="fa-light fa-plus"
              onClick={() => setHidden(!hidden)}
            ></i>
            <AddNote hidden={hidden} />
          </div>
          <div
            className="notes"
            style={{ display: showNotes === true ? "flex" : "none" }}
          >
            {notes.length > 0 ? (
              notes.map((note, index) => {
                return (
                  <div className="note-Box" key={index}>
                    <i className="fa-solid fa-quote-right"></i>
                    <h2>{note.text}</h2>
                    <p>{note.note}</p>
                    <i className="fa-solid fa-quote-left"></i>
                    {note.public === false && (
                      <i className="fa-solid fa-lock"></i>
                    )}
                    <div className="edit-Note">
                      <span>
                        <i
                          className="fa-light fa-trash"
                          onClick={() => handleDelete(note.id)}
                        ></i>
                      </span>
                    </div>
                  </div>
                );
              })
            ) : (
              <h2>No Notes Available</h2>
            )}
          </div>
        </div>
        <span className="arrow" onClick={() => setShowNotes(!showNotes)}>
          <i
            className={arrow}
            style={{
              display: arrow === "fa-light fa-arrow-right" ? "none" : "block",
            }}
          ></i>
          {text}
          <i
            className={arrow}
            style={{
              display: arrow === "fa-light fa-arrow-left" ? "none" : "block",
            }}
          ></i>
        </span>
      </div>
    </div>
  );
}
