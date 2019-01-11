import { Component, OnInit } from '@angular/core';
import { Author } from '../models/author';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { AuthorService } from '../services/author.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-author-detail',
  templateUrl: './author-detail.component.html',
  styleUrls: ['./author-detail.component.css']
})
export class AuthorDetailComponent implements OnInit {

  author: Author;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authorService: AuthorService) { }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    this.authorService.getById(id).subscribe(
      data => {
        this.author = data[0];
      },
      err => {
        console.log(err)
      }
    )
  }

}
