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
        'Authorization': 'Bearer ' + this.authenticationService.currentUserValue.token
      })
    };
  }

  public upload(file) {
    const formData: FormData = new FormData();
    formData.append('image', file);
    return this.http.post(this.url, formData, this.httpOptions);
  }
}
