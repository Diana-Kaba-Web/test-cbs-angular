import { Component } from '@angular/core';
import { AuthorsService } from './services/authors.service';
import { Author } from './classes/author';
import { Book } from './classes/books';
import { Genre } from './classes/genre';
import { DetailsService } from './services/details.service';
import { FormsService } from './services/forms.service';
import { ListenersService } from './services/listeners.service';
import { LocalstorageService } from './services/localstorage.service';
import { BooksService } from './services/books.service';
import { GenresService } from './services/genres.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'test-cbs-angular';
  authors: Author[] = [];
  genres: Genre[] = [];
  books: Book[] = [];

  constructor(
    private authorsService: AuthorsService,
    private detailsService: DetailsService,
    private formsService: FormsService,
    private listenersService: ListenersService,
    private localstorageService: LocalstorageService,
    private booksService: BooksService,
    private genresService: GenresService) { }

  fillStaticInfo() {
    if (this.authors.length === 0 && this.genres.length === 0) {
      const author1 = new Author("Шевченко", "Тарас", 1564, "Григорович");
      const author2 = new Author("Шекспір", "Вільям", 1722);
      const author3 = new Author("Роулінг", "Джоан", 1965);
      this.authors.push(author1);
      this.authors.push(author2);
      this.authors.push(author3);

      const genre1 = new Genre("поезія");
      const genre2 = new Genre("вірші");
      const genre3 = new Genre("трагедія");
      const genre4 = new Genre("фентезі");
      this.genres.push(genre1);
      this.genres.push(genre2);
      this.genres.push(genre3);

      this.localstorageService.saveGenresToLocalStorage(this.genres);

      const book1 = new Book("Кобзар", 256, genre1.name);
      const book2 = new Book("Катерина", 164, genre1.name);
      const book3 = new Book("Ромео і Джульєтта", 208, genre2.name);
      const book4 = new Book("Гамлет", 240, genre2.name);
      const book5 = new Book("Гаррі Поттер і прокляте дитя", 350, genre4.name);
      author1.addBook(book1);
      author1.addBook(book2);
      author2.addBook(book3);
      author2.addBook(book4);
      author3.addBook(book5);

      this.localstorageService.saveToLocalStorage(this.authors);
    }
  }

  ngOnInit() {
    this.authors = this.localstorageService.loadFromLocalStorage();
    this.genres = this.localstorageService.loadGenresFromLocalStorage();
    this.fillStaticInfo();
    this.authorsService.makeRows(this.authors);

    this.authorsService.populateAuthorDropdown(this.authors);
    this.genresService.populateGenreDropdown(this.genres, 'book-genre');

    this.listenersService.addListeners(this.authors);

    const btnHide = document.querySelector(".btn-hide");
    if (!btnHide) return;
    btnHide.addEventListener("click", this.detailsService.hideAuthorDetails);

    const addAuthor = document.querySelector(".add-author");
    if (!addAuthor) return;
    addAuthor.addEventListener("click", this.formsService.showAuthorForm);

    const hideAuthor = document.querySelector(".hide-author-form");
    if (!hideAuthor) return;
    hideAuthor.addEventListener("click", this.formsService.hideAuthorForm);

    const authorForm = document.getElementById("author-form");
    if (!authorForm) return;
    authorForm.addEventListener("submit", (event) => {
      this.authorsService.addAuthor(event, this.authors);
    });

    const sortAuthors = document.querySelector('.sort-authors');
    if (!sortAuthors) return;
    sortAuthors.addEventListener('click', () => this.authorsService.sortAuthors(this.authors));

    const addBook = document.querySelector(".add-book");
    const hideBook = document.querySelector(".hide-book-form");
    if (!addBook) return;
    if (!hideBook) return;
    addBook.addEventListener("click", this.booksService.showBookForm);
    hideBook.addEventListener("click", this.booksService.hideBookForm);

    const bookForm = document.getElementById("book-form");
    if (!bookForm) return;
    bookForm.addEventListener("submit", (event) => {
      this.booksService.addBook(event, this.authors, this.genres);
    });

    const showGenres = document.querySelector('.show-genres');
    if(!showGenres) return;
    showGenres.addEventListener('click', () => this.genresService.showGenres());

    const hideGenre = document.querySelector('.hide-list');
    if(!hideGenre) return;
    hideGenre.addEventListener('click', this.genresService.hideListOfGenres);

    const addGenre = document.querySelector('.add-genre');
    if(!addGenre) return;
    addGenre.addEventListener('click', this.genresService.showAddGenreForm);

    const hideGenreForm = document.querySelector('.hide-genre-form');
    if(!hideGenreForm) return;

    hideGenreForm.addEventListener('click', this.genresService.hideAddGenreForm);

    const addGenreForm = document.querySelector('#add-genre-form');
    if(!addGenreForm) return;

    addGenreForm.addEventListener('submit', (e) => this.genresService.addGenre(e, this.genres));
  }
}
