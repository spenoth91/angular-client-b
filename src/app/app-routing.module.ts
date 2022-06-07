import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserListComponent} from './users/components/user-list/user-list.component';
import {MovieListComponent} from "./movies/components/movie-list/movie-list.component";
import {AuthGuard} from "./account/components/services/auth.guard";
import {LoginComponent} from "./account/components/login/login.component";
import {RegisterComponent} from "./account/components/register/register.component";

const routes: Routes = [
  { path: 'users', component: UserListComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'movies', component: MovieListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
