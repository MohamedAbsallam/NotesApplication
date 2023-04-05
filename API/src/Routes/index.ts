import express from "express";
import usersRouter from "./api/users.Routes";
import notesRouter from "./api/notes.Routes";
// JWT Validate Authenticate Middleware
import auth from "../Middlewares/auth.Middleware";

// Create Instance From Express.Router()
const routes = express.Router();

// Use usersRouter for path '/api/users'
routes.use("/users", usersRouter);
// Use notesRouter for path '/api/notes'
routes.use("/notes", auth, notesRouter);

export default routes;
