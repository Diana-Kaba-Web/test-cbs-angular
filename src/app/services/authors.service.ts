import { Injectable } from '@angular/core';
import { Author } from '../classes/author';
import { ListenersService } from './listeners.service';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorsService {

  constructor(
    private listenersService: ListenersService,
    private localstorageService: LocalstorageService) { }

  makeRows(authors: Author[]) {
    const authorTable = document.querySelector("tbody");
    if (!authorTable) return;
    authorTable.innerHTML = '';

    let i = 0;
    authors.forEach(author => {
      authorTable.innerHTML += `
        <tr>
            <td>${author.firstName} ${author.lastName}</td>
            <td>${author.countOfBooks}</td>
            <td>
                <button class="btn btn-primary btn-details btn-sm" data-author-index="${i}">Деталі</button>
                <button class="btn btn-primary btn-edit btn-sm" data-author-index="${i}">Редагувати</button>
                <button class="btn btn-primary btn-delete btn-sm" data-author-index="${i}">Видалити</button>
            </td>
        </tr>`;
      i++;
    });
  }

  makeRow(authors: Author[]) {
    let i = authors.length - 1;
    console.log(authors[i]);
    const tbody = document.querySelector("tbody");
    if (!tbody) return;
    tbody.innerHTML += `
    <tr>
        <td>${authors[i].firstName} ${authors[i].lastName}</td>
        <td>${authors[i].countOfBooks}</td>
        <td>
            <button class="btn btn-primary btn-details btn-sm" data-author-index="${i}">Деталі</button>
            <button class="btn btn-primary btn-edit btn-sm" data-author-index="${i}">Редагувати</button>
            <button class="btn btn-primary btn-delete btn-sm" data-author-index="${i}">Видалити</button>
        </td>
    </tr>`;
    // addListeners(authors);
  }

  addAuthor(event: Event, authors: Author[]) {
    event.preventDefault();

    const lastName: HTMLInputElement | null = document.getElementById("author-lastname") as HTMLInputElement;
    const firstName: HTMLInputElement | null = document.getElementById("author-firstname") as HTMLInputElement;
    const middleName: HTMLInputElement | null = document.getElementById("author-middlename") as HTMLInputElement;
    const yearDate: HTMLInputElement | null = document.getElementById("author-yearbirth") as HTMLInputElement;
    if (!lastName) return;
    else if (!firstName) return;
    else if (!middleName) return;
    else if (!yearDate) return;

    const isValid = this.validateTextField(lastName.value.trim(), "^[А-Яа-яІіЇїЄєҐґA-Za-z\\s'-]{2,50}$", "Прізвище")
      && this.validateTextField(firstName.value.trim(), "^[А-Яа-яІіЇїЄєҐґA-Za-z\\s'-]{2,50}$", "Ім'я")
      && (middleName.value.trim() === '' || this.validateTextField(middleName.value.trim(), "^[А-Яа-яІіЇїЄєҐґA-Za-z\\s'-]{0,50}$", "По батькові"));

    if (!isValid)
      return;

    if (+yearDate.value < 1500 || +yearDate.value > Number(new Date().getFullYear())) {
      const errorYear = document.getElementById("error-year");
      if (!errorYear) return;
      errorYear.classList.remove("d-none");
      return;
    } else {
      const errorYear = document.getElementById("error-year");
      if (!errorYear) return;
      errorYear.classList.add("d-none");
    }

    const newAuthor = new Author(lastName.value.trim(), firstName.value.trim(), +yearDate.value, middleName.value.trim());
    authors.push(newAuthor);

    this.localstorageService.saveToLocalStorage(authors);
    this.makeRow(authors);
    this.populateAuthorDropdown(authors);
    this.listenersService.addListeners(authors);

    const authorFormContainer = document.querySelector(".author-form");
    const authorForm: HTMLFormElement | null = document.querySelector("#author-form");
    if (!authorFormContainer) return;
    if (!authorForm) return;

    authorFormContainer.classList.add("d-none");
    authorForm.reset();
  }

  deleteAuthor(index: number, authors: Author[]) {
    const isSure = confirm("Ви точно бажаєте видалити автора?");
    if (isSure) {
      authors.splice(index, 1);
      this.localstorageService.saveToLocalStorage(authors);
      this.makeRows(authors);
      this.listenersService.addListeners(authors);
    }
  }

  sortAuthors(authors: Author[]) {
    authors.sort((a, b) => a.firstName.localeCompare(b.firstName));
    this.makeRows(authors);
    this.listenersService.addListeners(authors);
  }

  validateTextField(value: string, pattern: string, fieldName: string) {
    const regex = new RegExp(pattern);
    if (!regex.test(value.trim())) {
      alert(`${fieldName} має невірний формат.`);
      return false;
    }
    return true;
  }

  populateAuthorDropdown(authors: Author[]) {
    const dropdown = document.getElementById("book-author");
    if (!dropdown) return;

    authors.forEach((author, index) => {
      dropdown.innerHTML += `<option value="${index}">${author.firstName} ${author.lastName}</option>`;
    });
  }
}
