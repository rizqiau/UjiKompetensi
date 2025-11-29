import React, { useEffect, useState } from "react";

/**
 * Form input buku (interface input).
 */
function BookForm({ onSave, onCancel, editingBook }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState(new Date().getFullYear());
  const [isAvailable, setIsAvailable] = useState(true);

  // jika sedang edit, isi form dengan data buku
  useEffect(() => {
    if (editingBook) {
      setTitle(editingBook.title);
      setAuthor(editingBook.author);
      setYear(editingBook.year);
      setIsAvailable(editingBook.isAvailable);
    } else {
      setTitle("");
      setAuthor("");
      setYear(new Date().getFullYear());
      setIsAvailable(true);
    }
  }, [editingBook]);

  function handleSubmit(e) {
    e.preventDefault();

    // percabangan IF
    if (!title || !author) {
      alert("Judul dan Penulis wajib diisi!");
      return;
    }

    onSave({
      id: editingBook ? editingBook.id : undefined,
      title: title,
      author: author,
      year: Number(year),
      isAvailable: isAvailable,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="card card-body mb-3">
      <h5>{editingBook ? "Edit Buku" : "Tambah Buku Baru"}</h5>

      <div className="mb-2">
        <label className="form-label">Judul</label>
        <input
          className="form-control"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Misalnya: Pemrograman Web"
        />
      </div>

      <div className="mb-2">
        <label className="form-label">Penulis</label>
        <input
          className="form-control"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Nama Penulis"
        />
      </div>

      <div className="mb-2">
        <label className="form-label">Tahun Terbit</label>
        <input
          type="number"
          className="form-control"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
      </div>

      <div className="form-check mb-2">
        <input
          id="available"
          type="checkbox"
          className="form-check-input"
          checked={isAvailable}
          onChange={(e) => setIsAvailable(e.target.checked)}
        />
        <label htmlFor="available" className="form-check-label">
          Tersedia
        </label>
      </div>

      <div className="d-flex gap-2">
        <button type="submit" className="btn btn-primary">
          Simpan
        </button>
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Batal
        </button>
      </div>
    </form>
  );
}

export default BookForm;
