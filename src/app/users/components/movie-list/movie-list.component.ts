import {Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from "@angular/core";
import {Movie} from "../../models/movie.model";
import {Subscription} from "rxjs";
import {MovieService} from "../../services/movie.service";

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.components.css']
})
export class MovieListComponent implements OnInit, OnDestroy {
  movies: Movie[];
  moviesMap: Map<string, Movie>;
  imdbMovies: any[];
  private subscription: Subscription;

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    const movieSearchBar = (document.getElementById("movieSearchBar") as HTMLInputElement);
    movieSearchBar.onkeyup = event => {
        if (event.key == 'Enter') {
          //this.subscription = this.movieService.getMoviesByKeywordFromImdb(movieSearchBar.value)
            //.subscribe(data => this.imdbMovies = data["d"]);

          this.subscription = this.movieService.getMoviesByKeyword(movieSearchBar.value)
            .subscribe(data => this.movies = data);
        }
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
