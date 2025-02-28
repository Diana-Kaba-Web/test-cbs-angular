import { Injectable } from '@angular/core';
import { Author } from '../classes/author';
import { Book } from '../classes/books';
import { Genre } from '../classes/genre';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  constructor() { }
  loadFromLocalStorage() {
    const savedAuthors = localStorage.getItem("authors");
    if (!savedAuthors) return [];

    const authors = JSON.parse(savedAuthors);
    return authors.map((authorData: Author) => {
      const author = new Author(
        authorData.lastName,
        authorData.firstName,
        authorData.birthYear,
        authorData.middleName
      );
      author.books = authorData.books.map(bookData => new Book(bookData.title, bookData.pages, bookData.genre));
      author.countOfBooks = author.books.length;
      return author;
    });
  }

  saveToLocalStorage(authors: Author[]) {
    localStorage.setItem("authors", JSON.stringify(authors));
  }

  loadGenresFromLocalStorage() {
    const savedGenres = localStorage.getItem("genres");
    return savedGenres ? JSON.parse(savedGenres) : [];
  }

  saveGenresToLocalStorage(genres: Genre[]) {
    localStorage.setItem("genres", JSON.stringify(genres));
  }
}
