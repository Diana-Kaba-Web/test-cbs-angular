import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthorsComponent } from './components/authors/authors.component';
import { DetailsComponent } from './components/details/details.component';
import { ButtonsComponent } from './components/buttons/buttons.component';
import { BookComponent } from './components/book/book.component';
import { GenresComponent } from './components/genres/genres.component';
import { SearchComponent } from './components/search/search.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthorsComponent,
    DetailsComponent,
    ButtonsComponent,
    BookComponent,
    GenresComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
