import {Component} from '@angular/core';
import {AccountService} from "./account/components/services/account.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private auth: AccountService) {}

  public isLoggedIn() {
    return this.auth.isLoggedIn();
  }

  public logout() {
    this.auth.logout();
  }
}
