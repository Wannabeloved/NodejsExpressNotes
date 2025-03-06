const express = require("express");
const mongoose = require("mongoose");
const chalk = require("chalk");
const path = require("path");
const { addUser, loginUser } = require("./user.controller");
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

app.get("/register", async (req, res) => {
  return res.render("register", {
    title: "Notes App",
    error: undefined,
  });
});
app.post("/register", async (req, res) => {
  try {
    await addUser(req.body.email, req.body.password);
    res.redirect("/login");
  } catch (err) {
    if (err.code === 11000)
      res.render("register", {
        title: "Notes App",
        error: "User already exists",
      });
    else
      res.render("register", {
        title: "Notes App",
        error: err.message,
      });
  }
});
app.get("/login", async (req, res) => {
  return res.render("login", {
    title: "Notes App",
    error: undefined,
  });
});
app.post("/login", async (req, res) => {
  try {
    await loginUser(req.body.email, req.body.password);
    res.redirect("/");
  } catch (err) {
    res.render("login", {
      title: "Notes App",
      error: err.message,
    });
  }
});
app.get("/", async (req, res) => {
  return res.render("index", {
    title: "Notes App",
    notes: await getNotes(),
    user: req.user || null,
    created: false,
    error: undefined,
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
