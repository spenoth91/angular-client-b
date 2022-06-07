import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AccountService} from "../../account/components/services/account.service";

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  constructor(private http: HttpClient,
              private auth: AccountService) {}


}
