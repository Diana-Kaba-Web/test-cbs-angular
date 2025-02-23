import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthorsComponent } from './components/authors/authors.component';
import { DetailsComponent } from './components/details/details.component';
import { ButtonsComponent } from './components/buttons/buttons.component';
import { AddAuthorComponent } from './components/add-author/add-author.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthorsComponent,
    DetailsComponent,
    ButtonsComponent,
    AddAuthorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
