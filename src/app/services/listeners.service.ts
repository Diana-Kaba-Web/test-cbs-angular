import { Injectable } from '@angular/core';
import { Author } from '../classes/author';
import { Injector } from '@angular/core';
import { DetailsService } from './details.service';
import { AuthorsService } from './authors.service';
import { BooksService } from './books.service';

@Injectable({
  providedIn: 'root'
})
export class ListenersService {

  constructor(private injector: Injector) { }

  private get detailsService(): DetailsService {
    return this.injector.get(DetailsService);
  }

  private get authorsService(): AuthorsService {
    return this.injector.get(AuthorsService);
  }

  private get booksService(): BooksService {
    return this.injector.get(BooksService);
  }

  addListeners(authors: Author[]) {
    this.addDeletedEventListeners(authors);
    this.addDetailsEventListeners(authors);
    this.addDeleteBookEventListeners(authors);
    this.addEditEventListeners(authors);
  }

  addDetailsEventListeners(authors: Author[]) {
    document.querySelectorAll(".btn-details").forEach(btn => {
      btn.addEventListener('click', (event) => {
        const authorIndex = Number((event.currentTarget as HTMLElement).getAttribute("data-author-index"));
        this.detailsService.showAuthorDetails(authors, authorIndex);
      });
    });
  }

  addDeletedEventListeners(authors: Author[]) {
    document.querySelectorAll(".btn-delete").forEach(btn => {
      btn.addEventListener('click', (event) => {
        const authorIndex = Number((event.currentTarget as HTMLElement).getAttribute("data-author-index"));
        this.authorsService.deleteAuthor(authorIndex, authors);
      });
    });
  }

  addDeleteBookEventListeners(authors: Author[]) {
    document.querySelectorAll(".delete-book").forEach(btn => {
      btn.addEventListener('click', (event) => {
        event.preventDefault();
        const authorIndex = Number((event.currentTarget as HTMLElement).getAttribute("data-author-index"));
        const deleteBookForm = document.getElementById("delete-book-form");
        if (!deleteBookForm) return;
        (deleteBookForm as HTMLFormElement).setAttribute("data-author-index", String(authorIndex));
        this.booksService.showDeleteBookForm();
      });
    });
  }

  addEditEventListeners(authors: Author[]) {
    document.querySelectorAll(".btn-edit").forEach(btn => {
      btn.addEventListener("click", (event) => {
        const authorIndex = Number((event.currentTarget as HTMLElement).getAttribute("data-author-index"));
        this.authorsService.showEditAuthorForm(authors, authorIndex);
      });
    });
  }
}
