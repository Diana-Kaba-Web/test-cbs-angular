import { Injectable } from '@angular/core';
import { Author } from '../classes/author';

@Injectable({
  providedIn: 'root'
})
export class DetailsService {

  constructor() { }

  showAuthorDetails(authors: Author[], index: number) {
    const author = authors[index];
    console.log("Автор:", author);
    const authorDetailsSection = document.querySelector(".author-details");
    authorDetailsSection!.classList.remove("d-none");
    authorDetailsSection!.setAttribute("data-author-index", index.toString());

    const authorName = document.getElementById("author-name");
    const authorBirth = document.getElementById("author-birthyear");
    const booksList = document.getElementById("author-books");
    if (!authorName) return;
    else if (!authorBirth) return;
    else if (!booksList) return;

    authorName.textContent = ` ${author.lastName} ${author.firstName} ${author.middleName || ''}`;
    authorBirth.textContent = ` ${author.birthYear.toString()}`;
    booksList.innerHTML = author.books.map((book, i) => `<li>"№${i} ${book.title}" - ${book.genre}, ${book.pages} сторінок</li>`).join("");
  }

  hideAuthorDetails() {
    const authorDetailsSection = document.querySelector(".author-details");
    if (!authorDetailsSection) return;
    authorDetailsSection.classList.add("d-none");
  }
}
