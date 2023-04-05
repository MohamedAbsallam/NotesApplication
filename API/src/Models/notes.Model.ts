import database from "../Database";
import Note from "./Types/notes.Type";

export class NotesModel {
  // Create Note Method
  async CreateNote(note: Note): Promise<Note> {
    try {
      // Open Connection
      const conn = await database.connect();
      const SQL =
        "INSERT INTO notes (text, note, public, user_id) VALUES ($1, $2, $3, $4) RETURNING text, note, created_date, user_id";
      // Run SQL Query
      const result = await conn.query(SQL, [
        note.text,
        note.note,
        note.public,
        note.user_id,
      ]);
      // Release Connection
      conn.release();
      // Return CREATED NOTE
      return result.rows[0];
    } catch (err) {
      throw new Error(`Error ${err}`);
    }
  }
  // Get Note Method
  async GetNotes(): Promise<Note[]> {
    try {
      // Open Connection
      const conn = await database.connect();
      const SQL =
        "SELECT text, note, public, created_date, user_id FROM notes WHERE public=true ORDER BY random() LIMIT 1";
      // Run SQL Query
      const result = await conn.query(SQL);
      // Release Connection
      conn.release();
      // Return ALL NOTES
      return result.rows;
    } catch (err) {
      throw new Error(`Error ${err}`);
    }
  }
  // Get Specific Note
  async getNote(id: number): Promise<Note> {
    try {
      // Open Connection
      const conn = await database.connect();
      const SQL =
        "SELECT text, note, public, created_date, user_id FROM notes WHERE id=($1)";
      // Run SQL Query
      const result = await conn.query(SQL, [id]);
      // Release Connection
      conn.release();
      // Return SPECIFIC NOTE
      return result.rows[0];
    } catch (err) {
      throw new Error(`Error ${err}`);
    }
  }
  // Update Note Method
  async UpdateNote(note: Note): Promise<Note> {
    try {
      // Open Connection
      const conn = await database.connect();
      const SQL =
        "UPDATE notes SET text=($1), note=($2), public=($3) WHERE id=($4) RETURNING text, note, public, created_date";
      // Run SQL Query
      const result = await conn.query(SQL, [
        note.text,
        note.note,
        note.public,
        note.id,
      ]);
      // Release Connection
      conn.release();
      // Return UPDAED NOTE
      return result.rows[0];
    } catch (err) {
      throw new Error(`Error ${err}`);
    }
  }
  // Delete Note Method
  async DestroyNote(id: number): Promise<Note> {
    try {
      // Open Connection
      const conn = await database.connect();
      const SQL = "DELETE FROM notes WHERE id=($1) RETURNING id, text, note";
      // Run SQL Query
      const result = await conn.query(SQL, [id]);
      // Release Connection
      conn.release();
      // Return DELETED NOTE
      return result.rows[0];
    } catch (err) {
      throw new Error(`Error ${err}`);
    }
  }
  // Get Trending Notes
  async TrendingNotes(): Promise<Note[]> {
    try {
      // Open Connection
      const conn = await database.connect();
      const SQL =
        "SELECT * FROM notes WHERE public=true ORDER BY random() LIMIT 2";
      // Run SQL Query
      const result = await conn.query(SQL);
      // Release Connection
      conn.release();
      //Return TRENDING NOTES
      return result.rows;
    } catch (err) {
      throw new Error(`Error ${err}`);
    }
  }
  // Get Profile Notes
  async ProfileNotes(id: number): Promise<Note[]> {
    try {
      // Open Connection
      const conn = await database.connect();
      const SQL = "SELECT * FROM notes WHERE user_id=($1) LIMIT 3";
      // Run SQL Query
      const result = await conn.query(SQL, [id]);
      // Release Connection
      conn.release();
      // Return PROFILE NOTES
      return result.rows;
    } catch (err) {
      throw new Error(`Error ${err}`);
    }
  }
  // Get Profile Notes
  async UserNotes(id: number): Promise<Note[]> {
    try {
      // Open Connection
      const conn = await database.connect();
      const SQL = "SELECT * FROM notes WHERE user_id=($1)";
      // Run SQL Query
      const result = await conn.query(SQL, [id]);
      // Release Connection
      conn.release();
      // Return PROFILE NOTES
      return result.rows;
    } catch (err) {
      throw new Error(`Error ${err}`);
    }
  }
}
