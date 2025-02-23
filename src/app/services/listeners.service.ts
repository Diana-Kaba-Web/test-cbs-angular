import { Injectable } from '@angular/core';
import { Author } from '../classes/author';
import { DetailsService } from './details.service';

@Injectable({
  providedIn: 'root'
})
export class ListenersService {

  constructor(private detailsService: DetailsService) { }
  addListeners(authors: Author[]) {
    // addDeleteBookEventListeners(authors);
    // addDeletedEventListeners(authors);
    this.addDetailsEventListeners(authors);
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
}
