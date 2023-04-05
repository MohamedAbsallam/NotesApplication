import { useState } from "react";
import { useSelector } from "react-redux";
import { createNote } from "./../../Model/notes.Model";
import "./index.scss";

export default function AddNote(props) {
  const userId = useSelector((state) => state.userData.id);
  const [note, setNote] = useState({ text: "", note: "", public: true });
  const [publicNote, setPublicNote] = useState(true);
  const [lettersLength, setLettersLength] = useState();
  const [lock, setLock] = useState("fa-solid fa-lock-open");
  const [closeIcon, setCloseIcon] = useState(false);

  const handleClick = () => {
    setPublicNote(!publicNote);
    if (publicNote === true) {
      setLock("fa-solid fa-lock");
    } else {
      setLock("fa-solid fa-lock-open");
    }
  };

  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value, public: publicNote });
    const { length } = e.target.value;
    if (length > 0) {
      setLettersLength(length);
    } else {
      setLettersLength();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createNote(userId, note)
      .then(() => {
        setCloseIcon(true);
      })
      .catch(() => {
        alert(`Error Creating new Note.`);
      });
  };

  return (
    <div className="add-Note">
      <div style={{ display: props.hidden ? "none" : "block" }}>
        <form
          onSubmit={handleSubmit}
          style={{ display: closeIcon ? "none" : "flex" }}
        >
          <div className="closeIcon">
            <i
              className="fa-solid fa-x"
              onClick={() => setCloseIcon(!closeIcon)}
            ></i>
            <div className="Tooltip">
              <p className="tooltip-Text">Close</p>
            </div>
          </div>
          <input
            type="text"
            name="text"
            placeholder="Note Title"
            value={note.title}
            required
            onChange={handleChange}
          />
          <i className="fa-solid fa-quote-right"></i>
          <textarea
            name="note"
            rows="10"
            maxLength="255"
            placeholder="Note Description"
            value={note.note}
            required
            onChange={handleChange}
          />
          <span
            className="length"
            style={{ color: lettersLength === 255 ? "#f00" : "#c1ccf0" }}
          >
            {lettersLength}
          </span>
          <i className="fa-solid fa-quote-left"></i>
          <i className={lock} onClick={handleClick}></i>
          <button type="submit">Add Note</button>
        </form>
      </div>
    </div>
  );
}
