import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';


@Injectable()
export class AuthService {

domain="http://localhost:4444";
 authToken;
  user;
  options;

  constructor( private http:Http) { }

   registerUser(user) {
    return this.http.post(this.domain + '/reg/register', user).map(res => res.json());
  }

  checkUsername(username) {
    return this.http.get(this.domain + '/reg/checkUsername/' + username).map(res => res.json());
  }

  // Function to check if e-mail is taken
  checkEmail(email) {
    return this.http.get(this.domain + '/reg/checkEmail/' + email).map(res => res.json());
  }
  login(user) {
    return this.http.post(this.domain + '/reg/login', user).map(res => res.json());

  }
    storeUserData(token, user) {
    localStorage.setItem('token', token); // Set token in local storage
    localStorage.setItem('user', JSON.stringify(user)); // Set user in local storage as string
    this.authToken = token; // Assign token to be used elsewhere
    this.user = user; // Set user to be used elsewhere
  }

loadToken() {
    this.authToken = localStorage.getItem('token'); 
  }

  createAuthenticationHeaders() {
    this.loadToken(); 
    this.options = new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/json', // Format set to JSON
        'authorization': this.authToken // Attach token
      })
    });
  }


  getProfile() {
    this.createAuthenticationHeaders(); 
    return this.http.get(this.domain + '/reg/profile', this.options).map(res => res.json());
  }

logout() {
    this.authToken = null; // Set token to null
    this.user = null; // Set user to null
    localStorage.clear(); // Clear local storage
  }

  loggedIn() {
    return tokenNotExpired();
  }
}
