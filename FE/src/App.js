import React, { useEffect, useState } from "react";
import { getBooks, createBook, updateBook, deleteBook } from "./api";
import BookForm from "./components/BookForm";
import BookTable from "./components/BookTable";
import Book from "./models/Book";
import { countOldBooks, findFirstUnavailable } from "./utils/bookLogic";

/**
 * Aplikasi utama.
 */
function App() {
  const [books, setBooks] = useState([]); // Array
  const [editingBook, setEditingBook] = useState(null);
  const [search, setSearch] = useState("");

  // muat data dari backend saat pertama kali
  useEffect(() => {
    loadBooks();
  }, []);

  function loadBooks() {
    getBooks().then((data) => {
      // mapping dari object plain → instance Book (OOP)
      const bookObjects = data.map(
        (item) =>
          new Book(
            item.id,
            item.title,
            item.author,
            item.year,
            item.isAvailable
          )
      );
      setBooks(bookObjects);
    });
  }

  /**
   * Fungsi menyimpan (tambah / edit).
   * Menggunakan if..else.
   */
  function handleSave(data) {
    // jika ada id → update
    if (data.id) {
      const existing = books.find((b) => b.getId() === data.id);
      if (!existing) return;

      // buat instance Book baru (OOP)
      const updatedBook = new Book(
        existing.getId(),
        data.title,
        data.author,
        data.year,
        data.isAvailable
      );

      updateBook(updatedBook.getId(), {
        title: updatedBook.title,
        author: updatedBook.author,
        year: updatedBook.year,
        isAvailable: updatedBook.isAvailable,
      }).then((saved) => {
        const savedBook = new Book(
          saved.id,
          saved.title,
          saved.author,
          saved.year,
          saved.isAvailable
        );
        setBooks((prev) =>
          prev.map((b) => (b.getId() === savedBook.getId() ? savedBook : b))
        );
        setEditingBook(null);
      });
    } else {
      // kalau id tidak ada → create baru
      createBook({
        title: data.title,
        author: data.author,
        year: data.year,
        isAvailable: data.isAvailable,
      }).then((saved) => {
        const savedBook = new Book(
          saved.id,
          saved.title,
          saved.author,
          saved.year,
          saved.isAvailable
        );
        setBooks((prev) => prev.concat(savedBook));
        setEditingBook(null);
      });
    }
  }

  function handleDelete(id) {
    if (!window.confirm("Yakin ingin menghapus buku ini?")) return;

    deleteBook(id).then(() => {
      setBooks((prev) => prev.filter((b) => b.getId() !== id));
    });
  }

  const filteredBooks = books.filter((b) =>
    b.title.toLowerCase().includes(search.toLowerCase())
  );

  const firstUnavailable = findFirstUnavailable(books);

  return (
    <div className="container my-4">
      <h2 className="mb-3">Aplikasi Manajemen Buku Perpustakaan</h2>

      <div className="mb-3">
        <input
          className="form-control"
          placeholder="Cari berdasarkan judul..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <BookForm
        onSave={handleSave}
        onCancel={() => setEditingBook(null)}
        editingBook={editingBook}
      />

      <BookTable
        books={filteredBooks}
        onEdit={(book) => setEditingBook(book)}
        onDelete={handleDelete}
      />

      <div className="mt-3">
        <p>
          Jumlah buku sebelum tahun 2000:{" "}
          <strong>{countOldBooks(books)}</strong>
        </p>

        {firstUnavailable && (
          <p>
            Contoh polymorphism: method <code>getDisplayText()</code> dari
            instance <code>Book</code> (turunan <code>Item</code>):{" "}
            <strong>{firstUnavailable.getDisplayText()}</strong>
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
