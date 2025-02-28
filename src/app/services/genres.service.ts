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
    if(!dropdown) return;

    dropdown.innerHTML = '';
    dropdown.innerHTML = genres
      .map((genre, index) => `<option value="${index}">${genre.name}</option>`)
      .join("");
  }
}
