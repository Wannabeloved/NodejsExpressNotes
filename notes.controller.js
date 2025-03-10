const Note = require("./models/Note");

async function addNote(title, owner) {
  const note = await Note.create({ title, owner });
  return note;
}

async function getNotes() {
  const notes = await Note.find();
  return notes;
}

async function deleteNoteById(id, owner) {
  const res = await Note.deleteOne({ _id: id, owner });
  if (res.deletedCount === 0) throw new Error("Note not found");
  return res.deletedCount;
}
async function updateNote(id, updatedData, owner) {
  const res = await Note.findOneAndUpdate(
    { _id: id, owner },
    { title: updatedData.title }
  );
  if (res === null) throw new Error("Note not found");
  return res;
}

module.exports = { addNote, getNotes, deleteNoteById, updateNote };
