import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthorService } from '../services/author.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { UploadfileService } from '../services/uploadfile.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  books: any;

  constructor(http: HttpClient,
    private authorService: AuthorService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    public uploadfileService: UploadfileService
  ) {
    http.get("http://localhost:3000/api/books").subscribe(
      data => {
        this.books = data;
        http.get("http://localhost:3000/api/authors").subscribe(
          authors => {
            var autores :any;
            autores = authors
            for(let b of this.books){
              for(let a of autores){
                if(b.author == a.author_id){
                  b.author = a;
                  break;
                }
              }
            }
          }
        )

      //  console.log(data)
      },
      err => {
        console.log(err)
      }
    )
  }

  ngOnInit() {
  }

  update() {

  }

  delete(id: number){
    if(confirm("¿Seguro que quieres borrar este autor?")) {
      this.bookService.delete(id).subscribe(
        data => {
          this.books.splice(this.books.findIndex((book) => {return book.book_id == id}),1);
          this.snackBar.open("Libro borrado correctamente","Cerrar", {panelClass: ['green-snackbar']})
        },
        err => {
          console.log("ERROR\n", err)
        }
      )
    }
  }

}
