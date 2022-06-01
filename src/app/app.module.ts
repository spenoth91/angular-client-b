import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { UserListComponent } from './users/components/user-list/user-list.component';
import { TableModule} from 'primeng/table';
import { MovieListComponent } from "./users/components/movie-list/movie-list.component";
import { LoginComponent } from './account/components/login/login.component';
import { ReactiveFormsModule } from "@angular/forms";
import { RegisterComponent } from './account/components/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    MovieListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TableModule
    LoginComponent,
    RegisterComponent,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
