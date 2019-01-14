import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { Book } from '../models/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  url: string;
  httpOptions : any;

  constructor(private http: HttpClient, private authenticationService: AuthenticationService) {
    this.url = "http://localhost:3000/api/books";
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + this.authenticationService.currentUserValue.token
      })
    };
  }

  getAll(){
    return this.http.get<Book[]>(this.url);
  }

  getById(id: any){
    return this.http.get<Book>(this.url+`/${id}`);
  }

  create(book: any){
    return this.http.post(this.url, book, this.httpOptions)
  }
  update(book){
    return this.http.put(this.url+`/${book.book_id}`, JSON.stringify(book), this.httpOptions)
  }
  delete(id: number){
    return this.http.delete(this.url+`/${id}`, this.httpOptions)
  }
}
