require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const chalk = require("chalk");
const path = require("path");
const cookieParser = require("cookie-parser");
const { addUser, loginUser } = require("./user.controller");
const auth = require("./middlewares/auth");
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
app.use(cookieParser());
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
    const token = await loginUser(req.body.email, req.body.password);
    res.cookie("token", token, { httpOnly: true });
    res.redirect("/");
  } catch (err) {
    res.render("login", {
      title: "Notes App",
      error: err.message,
    });
  }
});

app.use(auth);

app.get("/logout", async (req, res) => {
  res.cookie("token", "", { maxAge: 0, httpOnly: true });
  return res.redirect("/login");
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
  try {
    await deleteNoteById(req.params.id);
    return res.render("index", {
      title: "Notes App",
      notes: await getNotes(),
      user: req.user || null,
      created: false,
      error: undefined,
    });
  } catch (err) {
    return res.render("index", {
      title: "Notes App",
      notes: await getNotes(),
      user: req.user || null,
      created: false,
      error: err.message,
    });
  }
});
app.post("/", async (req, res) => {
  const title = req.body.title;
  const email = req.user.email;
  console.log(title, email);
  const isCreated = await addNote(title, email)
    .then(el => (el ? true : false))
    .catch(() => "error");
  return res.render("index", {
    title: "Notes App",
    notes: await getNotes(),
    user: req.user || null,
    created: isCreated,
    error: undefined,
  });
});
app.put("/:id", async (req, res) => {
  try {
    const result = await updateNote(req.params.id, req.body);
    res.setHeader("Content-Type", "application/json");
    console.log(JSON.stringify(result));
    return res.end(JSON.stringify(result));
  } catch (err) {
    return res.end(JSON.stringify({ error: err.message }));
  }
});

mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/notes")
  .then(() =>
    app.listen(PORT, () =>
      console.log(chalk.green(`Server is running on http://localhost:${PORT}`))
    )
  );
