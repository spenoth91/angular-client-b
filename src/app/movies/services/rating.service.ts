import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AccountService} from "../../account/components/services/account.service";
import {APIEndpointURLs} from "../../api-endpoint-urls";
import {RatingSaveTO} from "../models/rating-save-to";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  constructor(private http: HttpClient,
              private auth: AccountService) {}

  public saveRating(ratingSaveTO: RatingSaveTO): Observable<boolean> {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.auth.getToken()
    });
    return this.http.post<boolean>(APIEndpointURLs.saveRating,
      ratingSaveTO,
      {headers});
  }

  public updateRating(ratingSaveTO: RatingSaveTO): Observable<boolean> {

    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.auth.getToken()
    });
    return this.http.post<boolean>(APIEndpointURLs.updateRating,
      ratingSaveTO,
      {headers});
  }
}
