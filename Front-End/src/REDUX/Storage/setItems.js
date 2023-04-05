export default function setItems(user) {
  window.localStorage.setItem("token", JSON.stringify(user.token));
  window.localStorage.setItem("user_id", JSON.stringify(user.response.id));
  window.localStorage.setItem(
    "user_name",
    JSON.stringify(user.response.user_name)
  );
  window.localStorage.setItem(
    "first_name",
    JSON.stringify(user.response.first_name)
  );
  window.localStorage.setItem(
    "last_name",
    JSON.stringify(user.response.last_name)
  );
  window.localStorage.setItem("email", JSON.stringify(user.response.email));
}
