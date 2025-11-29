import Item from "./Item";

/**
 * Konsep "interface" sederhana:
 * Objek yang dianggap Printable harus punya method getDisplayText().
 * Di sini, Book mengimplementasikan "kontrak" tersebut.
 */

/**
 * Kelas Book:
 * - Inheritance: extends Item
 * - Polymorphism: override getDisplayText()
 * - Overloading (gaya JavaScript): method toggleAvailability bisa dipanggil
 *   dengan parameter atau tanpa parameter.
 */
class Book extends Item {
  constructor(id, title, author, year, isAvailable) {
    super(id, title); // panggil constructor Item
    this.author = author;
    this.year = year;
    this.isAvailable = isAvailable;
  }

  // override method dari Item → polymorphism
  getDisplayText() {
    return this.title + " - " + this.author + " (" + this.year + ")";
  }

  /**
   * "Overloading" versi sederhana:
   * - tanpa argumen → toggle
   * - dengan argumen boolean → set langsung
   */
  toggleAvailability(force) {
    if (typeof force === "boolean") {
      this.isAvailable = force;
    } else {
      this.isAvailable = !this.isAvailable;
    }
  }
}

export default Book;
