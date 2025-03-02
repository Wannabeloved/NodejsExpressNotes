const yargs = require("yargs");
const pckg = require("./package.json");

const { addNote, printNotes, deleteNoteById } = require("./notes.controller");

yargs.version(pckg.version);

yargs.command({
  command: "add",
  describe: "Add a new note to list",
  builder: {
    title: {
      type: "string",
      describe: "Note title",
      demandOption: true,
    },
  },
  async handler({ title }) {
    await addNote(title);
  },
});

yargs.command({
  command: "list",
  describe: "Print all notes",
  async handler() {
    await printNotes();
  },
});

yargs.command({
  command: "delete",
  describe: "Delete note by id",
  builder: {
    id: {
      type: "string",
      describe: "Note id",
      demandOption: true,
    },
  },
  async handler({ id }) {
    await deleteNoteById(id);
  },
});

yargs.parse();
