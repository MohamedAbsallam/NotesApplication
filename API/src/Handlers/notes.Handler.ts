import { NotesModel } from "../Models/notes.Model";
import Note from "../Models/Types/notes.Type";
import express from "express";

const noteModel = new NotesModel();

// CREATE Note Handler
export const createNote = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const note: Note = {
      text: req.body.text,
      note: req.body.note,
      public: req.body.public,
      user_id: req.params.id as unknown as number,
    };
    const response = await noteModel.CreateNote(note);
    res.status(200).json({
      status: "SUCCESS",
      note: response,
      message: "Note Created Successfully.",
    });
  } catch (err) {
    res.status(400).send(`Error ${err}`);
  }
};
// GET Notes Handler
export const getNotes = async (
  _req: express.Request,
  res: express.Response
) => {
  try {
    const response = await noteModel.GetNotes();
    res.status(200).json({
      status: "SUCCESS",
      notes: response,
      message: "Notes Fetched Successfully.",
    });
  } catch (err) {
    res.status(400).send(`Error ${err}`);
  }
};
// GET Spacific Note
export const getNote = async (req: express.Request, res: express.Response) => {
  try {
    const id: unknown = req.params.id;
    const response = await noteModel.getNote(id as number);
    res.status(200).json({
      status: "SUCCESS",
      note: response,
      message: "Note Fetched Successfully.",
    });
  } catch (err) {
    res.status(400).send(`Error ${err}`);
  }
};
// UPDATE Note Handler
export const updateNote = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const note: Note = {
      text: req.body.text,
      note: req.body.note,
      public: req.body.public,
      id: req.params.id as unknown as number,
    };
    const response = await noteModel.UpdateNote(note);
    res.status(200).json({
      status: "SUCCESS",
      note: response,
      message: "Note Updated Successfully",
    });
  } catch (err) {
    res.status(400).send(`Error ${err}`);
  }
};
// DELETE Note Handler
export const destroyNote = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const response = await noteModel.DestroyNote(
      req.params.id as unknown as number
    );
    res.status(200).json({
      status: "SUCCESS",
      note: response,
      message: "Note Deleted Successfully.",
    });
  } catch (err) {
    res.status(400).send(`Error ${err}`);
  }
};
// TRENDING Notes Handler
export const trendingNotes = async (
  _req: express.Request,
  res: express.Response
) => {
  try {
    const response = await noteModel.TrendingNotes();
    res.status(200).json({
      status: "SUCCESS",
      notes: response,
      message: "Trending Notes Fetched Successfully.",
    });
  } catch (err) {
    res.status(400).send(`Error ${err}`);
  }
};
// PROFILE Notes Handler
export const profileNotes = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const response = await noteModel.ProfileNotes(
      req.params.id as unknown as number
    );
    res.status(200).json({
      status: "SUCCESS",
      notes: response,
      message: "Profile Notes Fetched Successfully.",
    });
  } catch (err) {
    res.status(400).send(`Error ${err}`);
  }
};
// USER Notes Handler
export const userNotes = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const response = await noteModel.UserNotes(
      req.params.id as unknown as number
    );
    res.status(200).json({
      status: "SUCCESS",
      notes: response,
      message: "User Notes Fetched Successfully.",
    });
  } catch (err) {
    res.status(400).send(`Error ${err}`);
  }
};
