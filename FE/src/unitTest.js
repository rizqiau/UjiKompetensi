// src/unitTest.js
import Book from "./models/Book";
import { countOldBooks, findFirstUnavailable } from "./utils/bookLogic";

/**
 * Fungsi helper sederhana untuk cek hasil test.
 */
function assertEqual(testName, actual, expected) {
  const pass = actual === expected;
  console.log(
    (pass ? "✅" : "❌") +
      " " +
      testName +
      " | expected: " +
      expected +
      ", actual: " +
      actual
  );
}

/**
 * Menjalankan beberapa unit test sederhana
 * untuk fungsi countOldBooks dan findFirstUnavailable.
 */
function runTests() {
  console.log("=== RUNNING UNIT TESTS ===");

  // Data uji
  const books1 = [
    new Book(1, "Buku A", "Penulis A", 2005, true),
    new Book(2, "Buku B", "Penulis B", 2010, true),
    new Book(3, "Buku C", "Penulis C", 2020, true),
  ];

  const books2 = [
    new Book(1, "Buku Lama 1", "Penulis A", 1990, true),
    new Book(2, "Buku Baru", "Penulis B", 2005, true),
    new Book(3, "Buku Lama 2", "Penulis C", 1980, true),
  ];

  const books3 = []; // array kosong

  const books4 = [
    new Book(1, "Buku A", "Penulis A", 1990, true),
    new Book(2, "Buku B", "Penulis B", 2005, false),
    new Book(3, "Buku C", "Penulis C", 1980, false),
  ];

  // ==== Test countOldBooks ====
  assertEqual("UT1 - countOldBooks semua baru", countOldBooks(books1), 0);
  assertEqual("UT2 - countOldBooks campuran", countOldBooks(books2), 2);
  assertEqual("UT3 - countOldBooks array kosong", countOldBooks(books3), 0);

  // ==== Test findFirstUnavailable ====
  const noUnavailable = findFirstUnavailable(books1);
  assertEqual(
    "UT4 - findFirstUnavailable tidak ada yang dipinjam",
    noUnavailable === null,
    true
  );

  const firstUnavail = findFirstUnavailable(books4);
  // seharusnya mengembalikan buku id 2
  assertEqual(
    "UT5 - findFirstUnavailable buku kedua dipinjam (id=2)",
    firstUnavail ? firstUnavail.getId() : null,
    2
  );

  console.log("=== UNIT TESTS SELESAI ===");
}

// Jalankan semua test saat file ini di-import
runTests();
