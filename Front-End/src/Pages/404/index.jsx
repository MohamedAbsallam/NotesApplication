import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TvStatic from "./tv-static";
import "./index.scss";

export default function NotFound() {
  const location = useLocation();
  const navigator = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigator("/");
    }, 5000);
  });

  return (
    <div className="Not-Found">
      <div className="container">
        <div className="header-Text">
          <h2>404 NOT FOUND!!</h2>
          <p>
            No Results Match
            <span>{location.pathname}</span>
          </p>
        </div>
        <div className="tv-image">
          <div className="static">
            <TvStatic />
          </div>
        </div>
      </div>
    </div>
  );
}
