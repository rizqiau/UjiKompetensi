import React from "react";

/**
 * Tabel output buku (interface output).
 */
function BookTable({ books, onEdit, onDelete, onBorrow, onReturn }) {
  return (
    <table className="table table-striped">
      <thead className="table-dark">
        <tr>
          <th>Judul</th>
          <th>Penulis</th>
          <th>Tahun</th>
          <th>Status</th>
          <th>Peminjam</th>
          <th>Aksi</th>
        </tr>
      </thead>
      <tbody>
        {books.length === 0 ? (
          <tr>
            <td colSpan="5" className="text-center">
              Belum ada data buku.
            </td>
          </tr>
        ) : (
          books.map((book) => (
            <tr key={book.getId()}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.year}</td>
              <td>{book.isAvailable ? "Tersedia" : "Dipinjam"}</td>
              <td>{book.borrower || "-"}</td>
              <td>
                {/* Tombol Pinjam / Kembalikan */}
                {book.isAvailable ? (
                  <button
                    className="btn btn-sm btn-success me-2"
                    onClick={() => onBorrow(book)}>
                    Pinjam
                  </button>
                ) : (
                  <button
                    className="btn btn-sm btn-secondary me-2"
                    onClick={() => onReturn(book)}>
                    Kembalikan
                  </button>
                )}
                <button
                  className="btn btn-sm btn-warning me-2"
                  onClick={() => onEdit(book)}>
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => onDelete(book.getId())}>
                  Hapus
                </button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}

export default BookTable;
