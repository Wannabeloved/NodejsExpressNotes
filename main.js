const express = require("express");
const mongoose = require("mongoose");
const chalk = require("chalk");
const path = require("path");
const {
  addNote,
  getNotes,
  deleteNoteById,
  updateNote,
} = require("./notes.controller");

const PORT = 3000;

const app = express();
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", "pages");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  return res.render("index", {
    title: "Notes App",
    notes: await getNotes(),
    created: false,
  });
});
app.delete("/:id", async (req, res) => {
  await deleteNoteById(req.params.id);
  return res.render("index", {
    title: "Notes App",
    notes: await getNotes(),
    created: false,
  });
});
app.post("/", async (req, res) => {
  const title = req.body.title;
  const isCreated = await addNote(title)
    .then(el => (el ? true : false))
    .catch(() => "error");
  return res.render("index", {
    title: "Notes App",
    notes: await getNotes(),
    created: isCreated,
  });
});
app.put("/:id", async (req, res) => {
  console.log(req.body);
  const result = await updateNote(req.params.id, req.body);
  return await (res.setHeader("Content-Type", "application/json"),
  res.end(JSON.stringify(result)));
});

mongoose
  .connect("mongodb://user:mongopass@localhost:27017/notes?authSource=admin")
  .then(() =>
    app.listen(PORT, () =>
      console.log(chalk.green(`Server is running on http://localhost:${PORT}`))
    )
  );
