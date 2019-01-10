import { Injectable } from '@angular/core';
import { Author } from '../models/author';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {
  url: string;

  constructor(private http: HttpClient) {
    this.url = "http://localhost:3000/api/authors";
  }

  getAll(){
    return this.http.get<Author[]>('http://localhost:3000/api/authors');
  }

  getById(id: number){
    return this.http.get<Author>('http://localhost:3000/api/authors/${id}');
  }

  create(){

  }
  update(){
    
  }
  delete(){

  }
}
