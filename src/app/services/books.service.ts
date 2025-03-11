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

  hideEditBookForm() {
    const bookEditFormSection = document.querySelector(".book-edit-form");
    if (!bookEditFormSection) return;
    bookEditFormSection.classList.add("d-none");
  }

  editBook(authors: Author[], genres: Genre[]) {
    const bookEditFormSection = document.querySelector(".book-edit-form");
    const bookGenre: HTMLInputElement | null = document.getElementById("book-genre-edit") as HTMLInputElement;
    const bookTitle: HTMLInputElement | null = document.getElementById("book-title-edit") as HTMLInputElement;
    const bookPages: HTMLInputElement | null = document.getElementById("book-pages-edit") as HTMLInputElement;
    const bookAuthor: HTMLInputElement | null = document.getElementById("book-author-edit") as HTMLInputElement;
    if (!bookEditFormSection) return;
    if (!bookGenre) return;
    if (!bookTitle) return;
    if (!bookPages) return;
    if (!bookAuthor) return;

    const authorIndex = Number(bookEditFormSection.getAttribute("data-author-index"));
    const bookIndex = Number(bookEditFormSection.getAttribute("data-book-index"));
    const genreIndex = Number(bookGenre.value);
    const genre = genres[genreIndex];
    const updatedTitle = bookTitle.value.trim();
    const updatedPages = Number(bookPages.value);
    const updatedAuthorIndex = Number(bookAuthor.value);

    if (isNaN(genreIndex) || genreIndex < 0 || genreIndex >= genres.length) {
      alert("Виберіть коректний жанр.");
      return;
    }

    if (isNaN(authorIndex) || authorIndex < 0 || authorIndex >= authors.length) {
      alert("Виберіть коректного автора.");
      return;
    }

    if (updatedPages <= 0 || updatedPages > 10000) {
      alert("Кількість сторінок має бути між 1 і 10 000.");
      return;
    }

    const isValid = this.authorsService.validateTextField(
      updatedTitle,
      "^[А-Яа-яІіЇїЄєҐґA-Za-z0-9\\s'-]{2,100}$",
      "Назва книги"
    );

    if (!isValid) return;

    const isDuplicate = authors[updatedAuthorIndex].books.some(
      (book, index) => book.title.toLowerCase() === updatedTitle.toLowerCase() && index !== bookIndex
    );

    if (isDuplicate) {
      const errorTitle = document.getElementById("error-title-edit");
      if (!errorTitle) return;
      errorTitle.classList.remove("d-none");
      return;
    } else {
      const errorTitle = document.getElementById("error-title-edit");
      if (!errorTitle) return;
      errorTitle.classList.add("d-none");
    }

    if (authorIndex !== updatedAuthorIndex) {
      const [book] = authors[authorIndex].books.splice(bookIndex, 1);
      authors[updatedAuthorIndex].books.push(book);
    }

    const book = authors[updatedAuthorIndex].books[authorIndex === updatedAuthorIndex ? bookIndex : authors[updatedAuthorIndex].books.length - 1];
    book.title = updatedTitle;
    book.pages = updatedPages;
    book.genre = genre.name;

    this.localstorageService.saveToLocalStorage(authors);

    this.authorsService.makeRows(authors);
    this.hideEditBookForm();
    this.listenersService.addListeners(authors);
  }

  showEditBookForm(authors: Author[], authorIndex: string, bookIndex: string, genres: Genre[]) {
    const book = authors[Number(authorIndex)].books[Number(bookIndex)];
    const bookEditFormSection = document.querySelector(".book-edit-form");
    if (!bookEditFormSection) return;

    bookEditFormSection.classList.remove("d-none");
    bookEditFormSection.setAttribute("data-author-index", authorIndex);
    bookEditFormSection.setAttribute("data-book-index", bookIndex);

    const bookTitle: HTMLInputElement | null = document.getElementById("book-title-edit") as HTMLInputElement;
    const bookPages: HTMLInputElement | null = document.getElementById("book-pages-edit") as HTMLInputElement;
    if (!bookTitle) return;
    if (!bookPages) return;

    bookTitle.value = book.title;
    bookPages.value = book.pages.toString();

    const bookAuthorSelect = document.getElementById("book-author-edit");
    if (!bookAuthorSelect) return;
    bookAuthorSelect.innerHTML = '';
    bookAuthorSelect.innerHTML = authors
      .map((author, index) => {
        const selected = index === parseInt(authorIndex, 10) ? "selected" : "";
        return `<option value="${index}" ${selected}>${author.firstName} ${author.lastName}</option>`;
      })
      .join("");

    const genreDropdown = document.getElementById("book-genre-edit");
    if (!genreDropdown) return;
    genreDropdown.innerHTML = '';
    genreDropdown.innerHTML = genres
      .map((genre, index) => {
        const selected = genre.name === book.genre ? "selected" : "";
        return `<option value="${index}" ${selected}>${genre.name}</option>`;
      })
      .join("");
  }

  showBookIndexForm(authorIndex: string) {
    const bookIndexFormSection = document.querySelector(".book-index-form");
    if (!bookIndexFormSection) return;
    bookIndexFormSection.classList.remove("d-none");
    bookIndexFormSection.setAttribute("data-author-index", authorIndex);
  }

  hideBookIndexForm() {
    const bookIndexFormSection = document.querySelector(".book-index-form");
    if (!bookIndexFormSection) return;
    bookIndexFormSection.classList.add("d-none");
  }
}
