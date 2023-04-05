import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./index.scss";

export default function Pagination() {
  const location = useLocation();
  const [animation, setAnimation] = useState(null);

  useEffect(() => {
    setAnimation("motion");
    setTimeout(() => {
      setAnimation(false);
    }, 1000);
  }, [location]);

  return (
    <div className="Pagination">
      <div className="Link">
        <Link to="#">
          <p className={animation}>
            {location.pathname === "/"
              ? "HOME"
              : location.pathname.toUpperCase().split("/")[1]}
          </p>
        </Link>
      </div>
    </div>
  );
}
