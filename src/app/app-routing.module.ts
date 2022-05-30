import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserListComponent} from './users/components/user-list/user-list.component';
import {MovieListComponent} from "./users/components/movie-list/movie-list.component";


const routes: Routes = [
  {path: 'users', component: UserListComponent},
  {path: 'movies', component: MovieListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
