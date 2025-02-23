export class Book {
    title: string;
    pages: number;
    genre: string;
    
    constructor(title: string, pages: number, genre: string) {
        this.title = title;
        this.pages = pages;
        this.genre = genre;
    }
}