import { Component, OnInit, Inject } from '@angular/core';
import { Author } from '../models/author';
import { AuthorService } from '../services/author.service';
import { MatSnackBar, MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthorsComponent implements OnInit {

  authors: Author[];
  displayedColumns: string[] = ['Foto', 'Nombre'];
  dataSource : any;

  constructor(private authorService: AuthorService, public snackBar: MatSnackBar, public dialog: MatDialog) {
    this.fetchData()
  }

  ngOnInit() {

  }

  fetchData() {
    this.authorService.getAll().subscribe(
        data => {
          this.authors = data;
          this.dataSource = this.authors;
        },
        err => {
          console.log(err);
        })
  }

  showInfo(id: number){
    console.log(this.authors, id)
    console.log(this.authors[this.authors.findIndex((author) => {return author.author_id == id})])
  }

  delete(id: number){
    if(confirm("¿Seguro que quieres borrar este autor?")) {
      this.authorService.delete(id).subscribe(
        data => {
          this.authors.splice(this.authors.findIndex((author) => {return author.author_id == id}),1);
          this.snackBar.open("Autor borrado correctamente","Cerrar", {panelClass: ['green-snackbar']})
        },
        err => {
          console.log("ERROR\n", err)
        }
      )
    }
  }

  update(id: number){
    var author = this.authors[this.authors.findIndex((author) => {return author.author_id == id})];

    const dialogRef = this.dialog.open(UpdateDialog, {
      width: '600px',
      // height: "650px",
      data: {
        name: author.name,
        birthdate: author.birthdate,
        photo: author.photo,
        biography: author.biography
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      if(result){
        result.author_id = id;
        this.authorService.update(result).subscribe(
          data => {
            console.log(data)
            this.fetchData()
          },
          err => {
            console.log("ERORRRRRRRRRRRRRRRRRRRR", err)
          }
        );
      }
    });
  }

}
export interface DialogData {
  name: string;
  birthdate: string;
  photo: string;
  biography: string;
}

@Component({
  selector: 'update-dialog',
  templateUrl: 'update-dialog.html',
})
export class UpdateDialog {

  constructor(
    public dialogRef: MatDialogRef<UpdateDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    ) {}

  close(): void {
    this.dialogRef.close();
  }
   update(data: any) {
     // authorService
   }

}
