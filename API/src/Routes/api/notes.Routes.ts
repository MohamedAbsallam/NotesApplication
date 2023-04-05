import express from "express";
import {
  createNote,
  getNote,
  getNotes,
  updateNote,
  destroyNote,
  profileNotes,
  trendingNotes,
  userNotes,
} from "../../Handlers/notes.Handler";

const notesRouter = express.Router();

notesRouter.get("/profile/:id", profileNotes);
notesRouter.get("/trending", trendingNotes);
notesRouter.get("/users/:id", userNotes);
notesRouter.delete("/:id", destroyNote);
notesRouter.post("/:id", createNote);
notesRouter.put("/:id", updateNote);
notesRouter.get("/:id", getNote);
notesRouter.get("/", getNotes);

export default notesRouter;
