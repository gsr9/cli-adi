import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';

//Material design
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatMenuModule} from '@angular/material/menu';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {
  MatButtonModule,
  MatInputModule,
  MatIconModule,
  MatSelectModule,
  MatToolbarModule,
  MatSnackBarModule,
  MatDialogModule,
  MatFormFieldModule,
  MatGridListModule
} from '@angular/material';
import {MatCardModule} from '@angular/material/card';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import {FlexLayoutModule} from "@angular/flex-layout";
import { LoginComponent } from './login/login.component';
import { AuthorsComponent, UpdateDialog } from './authors/authors.component';
import { AuthorDetailComponent } from './author-detail/author-detail.component';
import { CreateAuthorComponent } from './create-author/create-author.component';
import { BooksComponent } from './books/books.component';

const appRoutes: Routes = [
  { path: 'autores', component: AuthorsComponent },
  { path: 'libros', component: BooksComponent },
  { path: 'autores/nuevo', component: CreateAuthorComponent },
  { path: 'autores/:id', component: AuthorDetailComponent },
  { path: 'login', component: LoginComponent},
  // { path: 'registro', component: RegistroComponent },
  // { path: 'usuario', component: UsuariosComponent }
  // ,
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  entryComponents: [AuthorsComponent, UpdateDialog],
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    AuthorsComponent,
    UpdateDialog,
    AuthorDetailComponent,
    CreateAuthorComponent,
    BooksComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    //Material design
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatMenuModule,
    MatListModule,
    MatSidenavModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatToolbarModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatDialogModule,
    MatFormFieldModule,
    MatGridListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
