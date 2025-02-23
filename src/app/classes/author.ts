import { Book } from "./books";

export class Author {
    lastName: string;
    firstName: string;
    middleName?: string;
    birthYear: number;
    books: Book[];
    countOfBooks: number;
    
    constructor(lastName: string, firstName: string, birthYear: number, middleName?: string) {
        this.lastName = lastName;
        this.firstName = firstName;
        this.middleName = middleName;
        this.birthYear = birthYear;
        this.books = [];
        this.countOfBooks = 0;
    }

    addBook(book: Book) {
        this.books.push(book);
        this.countOfBooks++;
    }
}