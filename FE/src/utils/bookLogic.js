// src/utils/bookLogic.js

/**
 * Menghitung jumlah buku dengan tahun terbit < 2000.
 * @param {Array} books - array Book
 * @returns {number} jumlah buku lama
 */
export function countOldBooks(books) {
  let count = 0;
  for (let i = 0; i < books.length; i++) {
    if (books[i].year < 2000) {
      count++;
    }
  }
  return count;
}

/**
 * Mencari buku pertama yang statusnya tidak tersedia (isAvailable = false).
 * @param {Array} books - array Book
 * @returns {Object|null} objek Book atau null jika tidak ada
 */
export function findFirstUnavailable(books) {
  if (!Array.isArray(books) || books.length === 0) return null;

  let index = 0;
  let found = null;

  do {
    if (!books[index].isAvailable) {
      found = books[index];
      break;
    }
    index++;
  } while (index < books.length);

  return found;
}
