import { Injectable } from '@angular/core';
import { Author } from '../classes/author';
import { Injector } from '@angular/core';
import { DetailsService } from './details.service';
import { AuthorsService } from './authors.service';

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

  addListeners(authors: Author[]) {
    this.addDeletedEventListeners(authors);
    this.addDetailsEventListeners(authors);
    // addDeleteBookEventListeners(authors);
    // addEditEventListeners(authors);
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
}
