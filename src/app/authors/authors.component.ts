import { Component, OnInit } from '@angular/core';
import { Author } from '../models/author';
import { HttpClient } from '@angular/common/http';
import { AuthorService } from '../services/author.service';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthorsComponent implements OnInit {

  authors: Author[];
  displayedColumns: string[] = ['Foto', 'Nombre'];
  dataSource : any;

  constructor(private authorService: AuthorService) {
    authorService.getAll().subscribe(
        data => {
          this.authors = data;
          this.dataSource = this.authors;
        },
        err => {
          console.log(err);
        })
  }

  ngOnInit() {
  }

  showInfo(id: number){

  }

  delete(id: number){
    
  }

  update(id: number){

  }

}
