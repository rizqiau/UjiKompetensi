/**
 * Service API sederhana untuk komunikasi dengan backend Node.js
 */
import axios from "axios";

const API_URL = "http://localhost:4000/api/books";

export function getBooks() {
  return axios.get(API_URL).then((res) => res.data);
}

export function createBook(data) {
  return axios.post(API_URL, data).then((res) => res.data);
}

export function updateBook(id, data) {
  return axios.put(API_URL + "/" + id, data).then((res) => res.data);
}

export function deleteBook(id) {
  return axios.delete(API_URL + "/" + id);
}
