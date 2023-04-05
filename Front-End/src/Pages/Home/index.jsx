import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, setLoading } from "./../../REDUX/Slices/users.Slice";
import { trendingNotes } from "./../../Model/notes.Model";
import Skeleton from "./../../Components/Skeleton";
import "./index.scss";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [trendNotes, setTrendNotes] = useState([]);
  const localItems = JSON.parse(localStorage.getItem("todos"));
  const loading = useSelector((state) => state.isLoading);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCheck = (index) => {
    const todosList = [...todos];
    todosList.splice(index, 1);
    setTodos(todosList);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const todosList = [...todos];
    setTodos([...todosList, { text: newItem }]);
    setNewItem("");
  };

  useEffect(() => {
    window.localStorage.setItem("todos", JSON.stringify(todos));
  });

  useEffect(() => {
    if (localItems) {
      setTodos(localItems);
    }
    setTimeout(() => {
      trendingNotes()
        .then((res) => {
          setTrendNotes(res.data.notes);
            dispatch(setLoading(false));
        })
        .catch(() => {
          alert('Error Loading Trending Notes!')
          // dispatch(logout())
        })
    }, 1000)
  }, []);
  
  return (
    <div className="home-Page">
      <div className="container">
        <header>
          <h2>Welcome Notes</h2>
          <p>Expolre How other's Think</p>
        </header>
        <div className="row">
          <div className="trending-Notes">
            <h2>Trending</h2>
            {loading ? (<Skeleton />) : (
              trendNotes.map((trendNote, index) => {
                return (
                  <div className="note-Box" key={index}>
                    <i className="fa-solid fa-quote-right"></i>
                    <h2>{trendNote.text}</h2>
                    <p>{trendNote.note}</p>
                    <i className="fa-solid fa-quote-left"></i>
                  </div>
                );
              })
            )}
            <button onClick={() => navigate("/explore")}>Explore</button>
          </div>
          <div className="todo-List">
            <h2>Today's Wishes</h2>
            <div className="input-Todo">
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="todo"
                  value={newItem}
                  placeholder="Whats up!"
                  onChange={(e) => setNewItem(e.target.value)}
                  required
                />
                <button type="submit">
                  <i className="fa-solid fa-plus"></i>
                </button>
              </form>
            </div>
            <div className="view-Todo">
              {todos.map((todo, index) => {
                return (
                  <p key={index}>
                    {todo.text}
                    <span>
                      <i
                        className="fa-light fa-square-check"
                        onClick={() => handleCheck(index)}
                      ></i>
                    </span>
                  </p>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
