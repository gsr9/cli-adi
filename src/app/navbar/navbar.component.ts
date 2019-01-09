import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  username : string;
  logged : boolean;
  currentUserSubscription: Subscription;

  constructor(
    private authenticationService: AuthenticationService,
  ) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
              var user = authenticationService.currentUserValue;
              if(user != null){
                this.logged = true;
                this.username = user.name;
              } else {
                this.logged = false;
                this.username = "usuario"
              }
        });

  }

  ngOnInit() {
  }
  logout () {
    this.authenticationService.logout();
  }
}
