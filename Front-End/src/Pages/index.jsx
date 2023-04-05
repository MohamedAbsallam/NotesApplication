import { Outlet } from "react-router-dom";
import Menu from "../Components/Menu";

export default function Layout() {
  return (
    <>
      <Menu />
      <Outlet />
    </>
  );
}
