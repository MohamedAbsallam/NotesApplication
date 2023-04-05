import { useState } from "react";
import "./index.scss";

export default function Notifi(props) {
  const [style, setStyle] = useState("notifi-Content");
  setTimeout(() => {
    setStyle("hidden");
  }, 4700);

  return (
    <div className="notifi-Component">
      <div className="container">
        <div className={style}>
          <div className={props.className}>
            <h2>{props.header}</h2>
            <p>{props.message}</p>
            <hr />
          </div>
        </div>
      </div>
    </div>
  );
}
