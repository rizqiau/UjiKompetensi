/**
 * Backend sederhana dengan Node.js + Express
 * Menyimpan data buku ke file db.json (sebagai database).
 */

const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const DB_FILE = path.join(__dirname, "db.json");

app.use(cors());
app.use(express.json());

/**
 * Membaca database dari file JSON.
 */
function readDB() {
  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify({ books: [] }, null, 2));
  }
  const data = fs.readFileSync(DB_FILE, "utf-8");
  return JSON.parse(data);
}

/**
 * Menulis database ke file JSON.
 */
function writeDB(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

/**
 * GET /api/books
 * Mengambil semua buku.
 */
app.get("/api/books", (req, res) => {
  const db = readDB();
  res.json(db.books);
});

/**
 * POST /api/books
 * Menambahkan buku baru.
 */
app.post("/api/books", (req, res) => {
  const { title, author, year, isAvailable } = req.body;

  // Contoh percabangan IF
  if (!title || !author) {
    return res.status(400).json({ message: "Judul dan Penulis wajib diisi." });
  }

  const db = readDB();
  const newBook = {
    id: Date.now(),
    title: title,
    author: author,
    year: Number(year) || new Date().getFullYear(),
    isAvailable: typeof isAvailable === "boolean" ? isAvailable : true,
  };

  db.books.push(newBook); // Array
  writeDB(db);

  res.status(201).json(newBook);
});

/**
 * PUT /api/books/:id
 * Mengubah data buku.
 */
app.put("/api/books/:id", (req, res) => {
  const id = Number(req.params.id);
  const db = readDB();
  const books = db.books;

  // cari index buku
  const index = books.findIndex((b) => b.id === id);
  if (index === -1) {
    return res.status(404).json({ message: "Buku tidak ditemukan." });
  }

  const updatedBook = {
    ...books[index],
    ...req.body,
    year: Number(req.body.year || books[index].year),
  };

  books[index] = updatedBook;
  writeDB(db);

  res.json(updatedBook);
});

/**
 * DELETE /api/books/:id
 * Menghapus buku.
 */
app.delete("/api/books/:id", (req, res) => {
  const id = Number(req.params.id);
  const db = readDB();
  const beforeLength = db.books.length;

  db.books = db.books.filter((b) => b.id !== id);
  writeDB(db);

  if (db.books.length === beforeLength) {
    return res.status(404).json({ message: "Buku tidak ditemukan." });
  }

  res.status(204).end();
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log("Server berjalan di http://localhost:" + PORT);
});
