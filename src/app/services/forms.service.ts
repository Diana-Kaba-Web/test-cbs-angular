import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormsService {

  constructor() { }

  showAuthorForm() {
    const authorFormSection = document.querySelector(".author-form");
    if (!authorFormSection) return;
    authorFormSection.classList.remove("d-none");
  }

  hideAuthorForm() {
    const authorFormSection = document.querySelector(".author-form");
    if (!authorFormSection) return;
    authorFormSection.classList.add("d-none");
  } 
}
