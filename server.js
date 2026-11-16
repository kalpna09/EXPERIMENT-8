
const express = require("express");
const app = express();

app.use(express.json());

let books = [
  { id: 1, title: "JavaScript", author: "John" },
  { id: 2, title: "React", author: "David" }
];

app.get("/books", (req, res) => {
  res.json(books);
});

app.get("/books/:id", (req, res) => {
  const book = books.find(b => b.id == req.params.id);
  if (!book) return res.status(404).send("Book not found");
  res.json(book);
});

app.post("/books", (req, res) => {
  const book = {
    id: Date.now(),
    title: req.body.title,
    author: req.body.author
  };
  books.push(book);
  res.status(201).json(book);
});

app.put("/books/:id", (req, res) => {
  const book = books.find(b => b.id == req.params.id);
  if (!book) return res.status(404).send("Book not found");

  book.title = req.body.title;
  book.author = req.body.author;
  res.json(book);
});

app.delete("/books/:id", (req, res) => {
  books = books.filter(b => b.id != req.params.id);
  res.json({ message: "Book deleted successfully" });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
