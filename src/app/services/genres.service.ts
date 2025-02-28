import { Injectable } from '@angular/core';
import { LocalstorageService } from './localstorage.service';
import { Genre } from '../classes/genre';

@Injectable({
  providedIn: 'root'
})
export class GenresService {

  constructor(
    private localstorageService: LocalstorageService) { }

  showGenres() {
    const genresContainer = document.querySelector('.genres');
    const ul = document.querySelector('#genres-list');
    if (!genresContainer) return;
    if (!ul) return;

    genresContainer.classList.remove('d-none');
    ul.innerHTML = '';
    const genres = this.localstorageService.loadGenresFromLocalStorage();

    genres.forEach((genre: Genre) => {
      ul.innerHTML += `<li>${genre.name}</li> `;
    });
  }

  hideListOfGenres() {
    const genresContainer = document.querySelector('.genres');
    if (!genresContainer) return;
    genresContainer.classList.add('d-none');
  }

  populateGenreDropdown(genres: Genre[], dropdownId: string) {
    const dropdown = document.getElementById(dropdownId);
    if (!dropdown) return;

    dropdown.innerHTML = '';
    dropdown.innerHTML = genres
      .map((genre, index) => `<option value="${index}">${genre.name}</option>`)
      .join("");
  }

  showAddGenreForm() {
    const addGenre = document.querySelector(".add-genre-form");
    if (!addGenre) return;

    addGenre.classList.remove("d-none");
  }

  hideAddGenreForm() {
    const addGenre = document.querySelector(".add-genre-form");
    if (!addGenre) return;

    addGenre.classList.add("d-none");
  }

  addGenre(event: Event, genres: Genre[]) {
    event.preventDefault();

    const genreName: HTMLInputElement | null = document.getElementById("genre-name") as HTMLInputElement;
    if(!genreName) return;

    const pattern = "^[А-Яа-яІіЇїЄєҐґA-Za-z\\s'-]{2,50}$";
    if (!new RegExp(pattern).test(genreName.value)) {
      alert("Назва жанру має містити тільки букви, пробіли, апострофи або дефіси, і бути довжиною від 2 до 50 символів.");
      return;
    }

    const genre = new Genre(genreName.value);

    const isDuplicate = genres.some(
      genre => genre.name.toLowerCase() === genreName.value.toLowerCase()
    );

    if (isDuplicate) {
      const errorGenreName = document.getElementById('error-genre-name');
      if(!errorGenreName) return;

      errorGenreName.classList.remove('d-none');
      return;
    } else {
      const errorGenreName = document.getElementById('error-genre-name');
      if(!errorGenreName) return;

      errorGenreName.classList.add('d-none');
      genres.push(genre);
      this.localstorageService.saveGenresToLocalStorage(genres);
      this.populateGenreDropdown(genres, 'book-genre');
      this.hideAddGenreForm();
      const addGenreForm: HTMLFormElement | null = document.querySelector('#add-genre-form');
      if(!addGenreForm) return;
      addGenreForm.reset();
    }
  }
}
