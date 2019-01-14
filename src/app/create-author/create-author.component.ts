import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthorService } from '../services/author.service';
import { UploadfileService } from '../services/uploadfile.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-create-author',
  templateUrl: './create-author.component.html',
  styleUrls: ['./create-author.component.css']
})
export class CreateAuthorComponent implements OnInit {

  author: any;
  createAuthorForm: FormGroup;
  photo: any;
  photoUrl: any;
  submitted = false;

  constructor(
    private location: Location,
    private formBuilder: FormBuilder,
    private authorService: AuthorService,
    private uploadFileService: UploadfileService,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.createAuthorForm = this.formBuilder.group({
            name: ['', Validators.required],
            birthdate: ['', Validators.required],
            biography: ['', Validators.required],
        });
    document.getElementById('file').addEventListener('change', (data) => {
      this.photo = data.target.files[0];
      var reader = new FileReader();
      reader.readAsDataURL(this.photo);
      reader.onload = (_event) => {
        this.photoUrl = reader.result;
      }
    })
  }

  get f() { return this.createAuthorForm.controls; }

  back(){
    this.location.back();
  }

  create(){
    this.submitted = true;
    if(this.createAuthorForm.invalid){
      return;
    }
    this.author = {
      "name": this.f.name.value,
      "birthdate": this.f.birthdate.value,
      "biography": this.f.biography.value
    }
console.log(this.photo)
    if(this.photo){
      //subir la imagen al servidor
      this.uploadFileService.upload(this.photo).subscribe(
        data => {
          console.log(data)
          this.author.photo = data.path;
          this.createAuthor()
        },
        err => {
          console.log(err)
        }
      )
    } else {
      console.log("NANIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII")
      this.author.photo = null;
      this.createAuthor()
    }
  }

  createAuthor(){
    this.authorService.create(this.author).subscribe(
      data => {
        console.log(data)
        //mostrar mensaje autor creado OK y volver a /autores
        this.snackBar.open("Autor creado correctamente","cerrar",
        {
          panelClass: ['green-snackbar'],
          verticalPosition: "top",
          horizontalPosition: "center"
        }).afterDismissed().subscribe(
          data => {
            this.location.back();
          }
        )
      },
      err => {
        console.log(err)
      }
    )
  }
}
