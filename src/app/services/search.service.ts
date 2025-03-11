import { Injectable } from '@angular/core';
import { Author } from '../classes/author';

export interface Result {
  title: string;
  genre: string;
  pages: number;
  author: string;
  authorIndex: number;
  bookIndex: number;
}

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor() { }

  searchBooks(authors: Author[], searchTitle: string) {
    const results: Result[] = [];

    authors.forEach((author, authorIndex) => {
      author.books.forEach((book, bookIndex) => {
        if (book.title.toLowerCase().includes(searchTitle.toLowerCase())) {
          results.push({
            title: book.title,
            genre: book.genre,
            pages: book.pages,
            author: `${author.firstName} ${author.lastName}`,
            authorIndex,
            bookIndex
          });
        }
      });
    });

    return results;
  }

  renderSearchResults(results: Result[]) {
    const searchResultsContainer = document.getElementById("search-results");
    if (!searchResultsContainer) return;

    if (results.length === 0) {
      searchResultsContainer.innerHTML = "<p>Нічого не знайдено.</p>";
      return;
    }

    searchResultsContainer.innerHTML = `
        <h4>Результати пошуку:</h4>
        <div class="container mt-2 p-2">
            <ul class="list-group">
            ${results
        .map(
          (result) => `
                <li class="list-group-item">
                    <strong>${result.title}</strong> (${result.genre}, ${result.pages} сторінок) 
                    - Автор: ${result.author}
                    <button class="btn btn-sm btn-primary float-end view-book-details" data-author-index="${result.authorIndex}" data-book-index="${result.bookIndex}">Деталі</button>
                </li>`
        )
        .join("")}
            </ul>
        </div>
    `;
  }
}
