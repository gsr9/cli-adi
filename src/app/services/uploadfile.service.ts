import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class UploadfileService {

  url: string;
  httpOptions: any;

  constructor(private http: HttpClient, private authenticationService: AuthenticationService) {
    this.url = "http://localhost:3000/api/fileUpload";
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'multipart/form-data',
        'Authorization': 'Bearer ' + this.authenticationService.currentUserValue.token
      })
    };
  }

  upload(img) {
    return this.http.post(this.url, img);
  }
}
