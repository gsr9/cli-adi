import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../models/user';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient, private router: Router) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(email: string, password: string) {
      console.log("HEMOS LLEGADO HASTA AQUI")
        return this.http.post<any>(`http://localhost:3000/api/login`, { email, password })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                console.log("*****************************\n",user)
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    user.user.token = user.token;
                    localStorage.setItem('currentUser', JSON.stringify(user.user));
                    localStorage.setItem('currentToken', user.token);
                    this.currentUserSubject.next(user.user);
                    console.log(this.currentUserSubject.getValue())
                }

                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        localStorage.removeItem('currentToken');
        this.currentUserSubject.next(null);
        this.router.navigate(["/"])
    }
}
