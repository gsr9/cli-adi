import { Component, OnInit, Inject } from '@angular/core';
import { AuthorService } from '../services/author.service';
import { MatSnackBar, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UploadfileService } from '../services/uploadfile.service';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  books: any;
  authors: any

  constructor(
    private authorService: AuthorService,
    private bookService: BookService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    public uploadfileService: UploadfileService
  ) {
    this.fetchData()
  }

  ngOnInit() {
  }

  update(id: number) {
    var book = this.books[this.books.findIndex((book) => {return book.book_id == id})];
    var photo : any;
    const dialogRef = this.dialog.open(UpdateBookDialog, {
      width: '600px',
      // height: "650px",
      data: {
        title: book.title,
        written_date: book.written_date,
        cover: book.cover,
        sinopsis: book.sinopsis,
        isbn: book.isbn,
        author: book.author,
        authors: this.authors
      }
    });
    
    document.getElementById("file").addEventListener('change', (data) => {
      photo = data.target.files[0];
      // console.log(data.srcElement.attributes)
      var reader = new FileReader();
      reader.readAsDataURL(photo);
      reader.onload = (_event) => {
      dialogRef.componentInstance.data.cover = reader.result;
      }
    })
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        result.book_id = id;
        result.author = result.author.author_id;
        if(photo){
          this.uploadfileService.upload(photo).subscribe(
            data => {
              result.photo = data.path;
              this.updateBook(result)
            },
            err => {
              console.log(err)
            }
          )
        } else {
          this.updateBook(result)
        }

      }
    });
  }

  updateBook(book){
    this.bookService.update(book).subscribe(
      data => {
        this.fetchData()
      },
      err => {
        console.log("ERORRRRRRRRRRRRRRRRRRRR", err)
      }
    );
  }

  delete(id: number){
    if(confirm("¿Seguro que quieres borrar este autor?")) {
      this.bookService.delete(id).subscribe(
        _data => {
          this.books.splice(this.books.findIndex((book) => {return book.book_id == id}),1);
          this.snackBar.open("Libro borrado correctamente","Cerrar", {panelClass: ['green-snackbar']})
        },
        err => {
          console.log("ERROR\n", err)
        }
      )
    }
  }

  fetchData(){
    this.bookService.getAll().subscribe(
      data => {
        this.books = data;
        this.authorService.getAll().subscribe(
          authors => {
            this.authors= authors;
            for(let b of this.books){
              for(let a of this.authors){
                if(b.author == a.author_id){
                  b.author = a;
                  break;
                }
              }
            }
          }
        )
      },
      err => {
        console.log(err)
      }
    )
  }
}

export interface BookDialogData {
  title: string;
  written_date: string;
  cover: any;
  sinopsis: string;
  coverUrl: any;
  isbn: string;
  author: any;
  authors: any;
}

@Component({
  selector: 'update-book-dialog',
  templateUrl: 'update-book-dialog.html',
})
export class UpdateBookDialog {
  constructor(
    public dialogRef: MatDialogRef<UpdateBookDialog>,
    @Inject(MAT_DIALOG_DATA) public data: BookDialogData,
    ) {
    }

  close(): void {
    this.dialogRef.close();
  }
  update(){}

}
