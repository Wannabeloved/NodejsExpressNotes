const yargs = require("yargs");
const pckg = require("./package.json");

const { addNote, printNotes } = require("./notes.controller");

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

yargs.parse();
