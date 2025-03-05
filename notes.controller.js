const Note = require("./models/Note");

async function addNote(title, { id } = {}) {
  const note = await Note.create({ title });
  return note;
}

async function getNotes() {
  const notes = await Note.find();
  return notes;
}

async function deleteNoteById(id) {
  const res = await Note.deleteOne({ _id: id });
  return res.deletedCount;
}
async function updateNote(id, updatedData) {
  const res = await Note.findOneAndUpdate(
    { _id: id },
    { title: updatedData.title }
  );
  return res;
}

module.exports = { addNote, getNotes, deleteNoteById, updateNote };
