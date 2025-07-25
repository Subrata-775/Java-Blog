const express = require("express");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const app = express();
const port = 3000;
const session = require("express-session");

//
// Set view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(session({
  secret: "secureSecret123",
  resave: false,
  saveUninitialized: true,
}));

// In-memory storage
  let blogs = [
  {
    id: uuidv4(),
    title: "Getting Started with Java",
    content: "Java is a powerful, object-oriented programming language used in web, desktop, and mobile development.",
    author: "admin"
  },
  {
    id: uuidv4(),
    title: "Why Learn Java in 2025?",
    content: "Java remains one of the most in-demand languages due to its portability, community support, and wide use in enterprise applications.",
    author: "admin"
  }
];

let users = []; // { username, password 

// Middleware to check login
function checkAuth(req, res, next) {
  if (!req.session.user) {
    return res.redirect("/login");
  }
  next();
}

// Show Register Form
app.get("/register", (req, res) => {
  res.render("register");
});

// Handle Registration
app.post("/register", (req, res) => {
  const { username, password } = req.body;
  if (users.find(u => u.username === username)) {
    return res.send("Username already exists");
  }
  users.push({ username, password });
  res.redirect("/login");
});

// Show Login Form
app.get("/login", (req, res) => {
  res.render("login");
});

// Handle Login
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) return res.send("Invalid credentials");
  req.session.user = username;
  res.redirect("/");
});

// Logout
app.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});


// main route


// ===================
// ROUTES
// ===================

// Home Page - Show All Blogs
app.get("/", (req, res) => {
  res.render("index", { blogs, user: req.session.user });
});

// Show Create Blog Form
app.get("/blogs/new", checkAuth, (req, res) => {
  res.render("new");
});

// Create Blog (POST)
app.post("/blogs", checkAuth, (req, res) => {
  const { title, content } = req.body;
  const newBlog = {
    id: uuidv4(),
    title,
    content,
    author: req.session.user,
  };
  blogs.push(newBlog);
  res.redirect("/");
});

// Show Individual Blog
app.get("/blogs/:id", (req, res) => {
  const blog = blogs.find((b) => b.id === req.params.id);
  if (!blog) return res.status(404).send("Blog not found");
  res.render("show", { blog });
});

// Delete Blog
app.get("/blogs/:id/delete", checkAuth, (req, res) => {
  blogs = blogs.filter((b) => b.id !== req.params.id || b.author !== req.session.user);
  res.redirect("/");
});







// Start Server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});