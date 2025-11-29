/**
 * Kelas dasar (base class) untuk item.
 * Contoh inheritance & polymorphism.
 */
class Item {
  constructor(id, title) {
    // protected (konsep) → convention pakai underscore
    this._id = id;
    this.title = title;
  }

  getId() {
    return this._id;
  }

  // Method ini akan di-override di subclass (polymorphism)
  getDisplayText() {
    return this.title;
  }
}

export default Item;
