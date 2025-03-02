const fs = require("fs/promises");
const path = require("path");
const chalk = require("chalk");

// const notes = [{ title: "first note", id: "1" }];
const NOTES_PATH = path.join(__dirname, "db.json");

async function addNote(title) {
  const notes = await getNotes();
  const note = {
    title,
    id: Date.now().toString(),
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
async function printNotes() {
  const notes = await getNotes();

  console.log(chalk.bgBlue("Here is the list of notes:"));
  notes.forEach(note =>
    console.log(chalk.italic(note.id), chalk.blue(note.title))
  );
}

module.exports = { addNote, printNotes, deleteNoteById };
