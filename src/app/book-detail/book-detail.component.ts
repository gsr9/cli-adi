import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../services/book.service';
import { AuthorService } from '../services/author.service';
import { Book } from '../models/book';
import { Author } from '../models/author';
import {Location} from '@angular/common';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {

  book: Book;
  author: Author;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private bookService: BookService,
    private authorService: AuthorService
  ) { }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    this.bookService.getById(id).subscribe(
      data => {
        this.book = data[0];
        this.authorService.getById(this.book.author).subscribe(
          author => {
            this.author = author[0]
          }
        )
      },
      err => {
        console.log(err)
      }
    )
  }

  back(){
    this.location.back();
  }

}
