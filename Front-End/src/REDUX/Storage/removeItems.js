export default function removeItems() {
  window.localStorage.removeItem("token");
  window.localStorage.removeItem("user_id");
  window.localStorage.removeItem("user_name");
  window.localStorage.removeItem("first_name");
  window.localStorage.removeItem("last_name");
  window.localStorage.removeItem("email");
}
