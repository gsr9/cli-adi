import { Injectable } from '@angular/core';
import { Author } from '../models/author';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {
  url: string;
  httpOptions : any;

  constructor(private http: HttpClient, private authenticationService: AuthenticationService) {
    this.url = "http://localhost:3000/api/authors";
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + this.authenticationService.currentUserValue.token
      })
    };
  }

  getAll(){
    return this.http.get<Author[]>(this.url);
  }

  getById(id: any){
    return this.http.get<Author>(this.url+`/${id}`);
  }

  create(author: any){
    return this.http.post(this.url, author, this.httpOptions)
  }
  update(author){
    return this.http.put(this.url+`/${author.author_id}`, JSON.stringify(author), this.httpOptions)
  }
  delete(id: number){
    return this.http.delete(this.url+`/${id}`, this.httpOptions)
  }
}
