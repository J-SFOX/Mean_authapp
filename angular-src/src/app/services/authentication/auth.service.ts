import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { User } from 'src/app/Models/user';
import { JsonPipe } from '@angular/common';
import { response } from 'express';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  
  baseUrl = 'http://localhost:3000/users';
  authToken: any | undefined;
  user: any;
  constructor(private httpClient: HttpClient) {}



  registerUser(user: any) {
    let _headers = new HttpHeaders();
    _headers.append('Content-Type', 'application/json');
    return this.httpClient
      .post(this.baseUrl + '/register', user, { headers: _headers });
  }

  authenticateUser(user:any) {
    let _headers = new HttpHeaders();
    _headers.append('Content-Type', 'application/json');
    return this.httpClient.post(this.baseUrl + '/authenticate', user,  { headers: _headers } )
  }

  getProfile() {
    this.loadToken();
    let _headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authToken}`
    });
    console.log(`Bearer ${this.authToken}`)
   
    return this.httpClient.get(this.baseUrl + '/profile',{ headers: _headers } )
  }


  loadToken():any{
    const token  = localStorage.getItem('id_token');
    this.authToken = token
  }

  storeUserData(token: any, user: any) {
    localStorage.setItem('id_token', token.replace('JWT ', ''));
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  isLoggedIn(){
    return localStorage.getItem('id_token') ? true : false
  }

  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

 


 
}


// private handleError(error: HttpErrorResponse) {
//   if (error.status === 0) {
//     // A client-side or network error occurred. Handle it accordingly.
//     console.error('An X error occurred:', error.error);
//   } else {
//     // The backend returned an unsuccessful response code.
//     // The response body may contain clues as to what went wrong.
//     console.error(
//       `Backend returned  X code ${error.status}, body was: `, error.error);
//   }
//   // Return an observable with a user-facing error message.
//   return throwError(() => new Error('Something bad happened; please try again later.'));
// }