import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {User} from "../../../users/models/user.model";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {JwtHelperService} from "@auth0/angular-jwt";
import {APIEndpointURLs} from "../../../api-endpoint-urls";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  currentUser: BehaviorSubject<User> = new BehaviorSubject<User>(null);

  private readonly TOKEN = "token";

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    const token = localStorage.getItem(this.TOKEN);
    if (token) {
      const jwt = new JwtHelperService();
      this.currentUser.next(jwt.decodeToken(token));
    }
  }

  login(email: string, password: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + btoa(email + ":" + password)
    });
    return this.http.post<any>(
      APIEndpointURLs.loginUrl, {}, {headers} )
      .pipe(
        map(
          response => {
            const result = response[this.TOKEN];
            if (result) {
              localStorage.setItem(this.TOKEN, result);
              return true;
            }
            else return false;
          }
        )
      )
  }

  logout() {
    localStorage.removeItem(this.TOKEN);
    this.router.navigate(['home']);
  }

  isLoggedIn(): boolean {
    const jwt = new JwtHelperService();
    const token = localStorage.getItem(this.TOKEN);
    return !jwt.isTokenExpired(token)
  }

  register(user: User) {
    return this.http.post(APIEndpointURLs.registerUrl, user);
  }

  getToken(): string {
    return localStorage.getItem(this.TOKEN);
  }
}
