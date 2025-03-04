import { Injectable } from '@angular/core';
import { Author } from '../classes/author';
import { Genre } from '../classes/genre';
import { AuthorsService } from './authors.service';
import { Book } from '../classes/books';
import { LocalstorageService } from './localstorage.service';
import { ListenersService } from './listeners.service';
import { DetailsService } from './details.service';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(
    private authorsService: AuthorsService,
    private localstorageService: LocalstorageService,
    private listenersService: ListenersService,
    private detailsService: DetailsService) { }

  addBook(event: Event, authors: Author[], genres: Genre[]) {
    event.preventDefault();

    const title: HTMLInputElement | null = document.getElementById("book-title") as HTMLInputElement;
    const pages: HTMLInputElement | null = document.getElementById("book-pages") as HTMLInputElement;
    const genreIndex: HTMLInputElement | null = document.getElementById("book-genre") as HTMLInputElement;
    const authorIndex: HTMLInputElement | null = document.getElementById("book-author") as HTMLInputElement;
    if (!title) return;
    if (!pages) return;
    if (!genreIndex) return;
    if (!authorIndex) return;

    if (isNaN(Number(genreIndex.value)) || Number(genreIndex.value) < 0 || Number(genreIndex.value) >= genres.length) {
      alert("Виберіть коректний жанр.");
      return;
    }
    const genre = new Genre(genres[Number(genreIndex.value)].name);

    if (isNaN(Number(authorIndex.value)) || Number(authorIndex.value) < 0 || Number(authorIndex.value) >= authors.length) {
      alert("Виберіть коректного автора.");
      return;
    }

    if (Number(pages.value) <= 0 || Number(pages.value) > 10000) {
      alert("Кількість сторінок має бути між 1 і 10 000.");
      return;
    }

    const isValid = this.authorsService.validateTextField(
      title.value.trim(),
      "^[А-Яа-яІіЇїЄєҐґA-Za-z0-9\\s'-]{2,100}$",
      "Назва книги"
    );

    if (!isValid) return;

    const isDuplicate = authors[Number(authorIndex.value)].books.some(
      (book) => book.title.toLowerCase() === title.value.trim().toLowerCase()
    );

    if (isDuplicate) {
      const errorTitle = document.getElementById("error-title");
      if (!errorTitle) return;
      errorTitle.classList.remove("d-none");
      return;
    } else {
      const errorTitle = document.getElementById("error-title");
      if (!errorTitle) return;
      errorTitle.classList.add("d-none");
    }

    const newBook = new Book(title.value.trim(), Number(pages.value), genre.name);
    authors[Number(authorIndex.value)].addBook(newBook);

    this.localstorageService.saveToLocalStorage(authors);
    this.authorsService.makeRows(authors);
    this.listenersService.addListeners(authors);

    const bookFormContainer = document.querySelector(".book-form");
    const bookForm: HTMLFormElement | null = document.querySelector("#book-form");
    if (!bookFormContainer) return;
    if (!bookForm) return;

    bookFormContainer.classList.add("d-none");
    bookForm.reset();
  }

  showBookForm() {
    const bookFormSection = document.querySelector(".book-form");
    if (!bookFormSection) return;
    bookFormSection.classList.remove("d-none");
  }

  hideBookForm() {
    const bookFormSection = document.querySelector(".book-form");
    if (!bookFormSection) return;
    bookFormSection.classList.add("d-none");
  }

  deleteBookByIndex(event: Event, authors: Author[], authorIndex: number) {
    event.preventDefault();

    const bookIndex: HTMLInputElement | null = document.getElementById("book-index") as HTMLInputElement;
    if (!bookIndex) return;
    if (Number(bookIndex.value) < 0 || Number(bookIndex.value) >= authors[authorIndex].books.length) {
      const errorBook = document.getElementById("error-book-index");
      if (!errorBook) return;

      errorBook.classList.remove("d-none");
      return;
    } else {
      const errorBook = document.getElementById("error-book-index");
      if (!errorBook) return;

      errorBook.classList.add("d-none");
    }

    const isSure = confirm("Ви точно бажаєте видалити цю книгу?");
    if (isSure) {
      authors[authorIndex].books.splice(Number(bookIndex.value), 1);
      authors[authorIndex].countOfBooks--;
      this.localstorageService.saveToLocalStorage(authors);
      this.detailsService.showAuthorDetails(authors, authorIndex);
      this.authorsService.makeRows(authors);

      const deleteForm: HTMLFormElement | null = document.querySelector("#delete-book-form");
      const deleteFormContainer = document.querySelector(".delete-book-form");
      if (!deleteForm) return;
      if (!deleteFormContainer) return;

      deleteFormContainer.classList.add("d-none");
      deleteForm.reset();
      this.listenersService.addListeners(authors);
    } else {
      const deleteFormContainer = document.querySelector(".delete-book-form");
      if (!deleteFormContainer) return;
      deleteFormContainer.classList.add("d-none");
    }
  }

  showDeleteBookForm() {
    const deleteBook = document.querySelector(".delete-book-form");
    if (!deleteBook) return;

    deleteBook.classList.remove("d-none");
  }
}
