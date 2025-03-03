const fs = require("fs/promises");
const path = require("path");
const chalk = require("chalk");

// const notes = [{ title: "first note", id: "1" }];
const NOTES_PATH = path.join(__dirname, "db.json");

async function addNote(title, { id } = {}) {
  const notes = await getNotes();
  const note = {
    title,
    id: id ?? Date.now().toString(),
  };

  notes.push(note);
  fs.writeFile(NOTES_PATH, JSON.stringify(notes));
  console.log(chalk.bgGreen("Note was added"));
}

async function getNotes() {
  const raw = await fs.readFile(NOTES_PATH, { encoding: "utf-8" });
  const notes = JSON.parse(raw);
  return Array.isArray(notes) ? notes : [];
}
async function deleteNoteById(id) {
  const notes = await getNotes();

  const filteredNotes = notes.filter(note => note.id !== id);
  await fs.writeFile(NOTES_PATH, JSON.stringify(filteredNotes));
  console.log(chalk.bgGreen("Note was deleted"));
}
async function updateNote(id, updatedData) {
  const notes = await getNotes();
  if (!notes.find(note => note.id === id))
    throw new Error(`Note with id ${id} not found`);

  const title = updatedData.title.toString().trim();
  if (title == "") throw new Error("Title cannot be empty");
  await deleteNoteById(id);
  return await addNote(title, { id });
}

module.exports = { addNote, getNotes, deleteNoteById, updateNote };
