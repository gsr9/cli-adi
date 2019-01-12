import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Author } from '../models/author';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-author',
  templateUrl: './create-author.component.html',
  styleUrls: ['./create-author.component.css']
})
export class CreateAuthorComponent implements OnInit {

  author: Author;
  createAuthorForm: FormGroup;
  photo: any;
  submitted = false;

  constructor(
    private location: Location,
    private formBuilder: FormBuilder,) {
  }

  ngOnInit() {
    this.createAuthorForm = this.formBuilder.group({
            name: ['', Validators.required],
            birthdate: ['', Validators.required],
            biography: ['', Validators.required],
            photo: ['', Validators.required],
        });
    document.getElementById('file').addEventListener('change', (data) => {
      this.photo = data.target.files[0];
      var reader = new FileReader();
      reader.readAsDataURL(data.target.files[0]);
      reader.onload = (_event) => {
        this.photo = reader.result;
      }
    })
  }

  get f() { return this.createAuthorForm.controls; }

  back(){
    this.location.back();
  }

  create(){
    this.submitted = true;
    //console.log(this.author, document.getElementById('file').files[0]);
    this.photo = document.getElementById('file').files[0];
    console.log(this.f)
  }

}
