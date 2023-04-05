import { useState } from "react";
import { addUserImage } from "./../../Model/users.Model";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addImage } from "./../../REDUX/Slices/users.Slice";
import "./index.scss";

export default function AddImage(props) {
  const [image, setImage] = useState(null);
  const [style, setStyle] = useState("block");
  const { id } = useParams();
  const dispatch = useDispatch();

  const handleSubmit = () => {
    e.preventDefault();
    addUserImage(id, image)
      .then((res) => {
        dispatch(addImage(res.data));
        console.log(`Image Added Successfully`, res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={props.className}>
      <div style={{ display: style }}>
        <i className="fa-solid fa-x" onClick={() => setStyle("none")}></i>
        <form onSubmit={handleSubmit}>
          <h3>Add Profile Image</h3>
          <input
            type="file"
            name="Add Image"
            placeholder="Add Image"
            onChange={() => setImage(e.target.files[0])}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}
