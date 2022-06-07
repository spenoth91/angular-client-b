import {Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from "@angular/core";
import {Movie} from "../../models/movie.model";
import {Observable, Subscription} from "rxjs";
import {MovieService} from "../../services/movie.service";
import { forkJoin } from 'rxjs';

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
  private imdbSubscription: Subscription;

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    // initial variables
    this.moviesMap = new Map<string, Movie>();
    this.movies = [];
    const movieSearchBar = (document.getElementById("movieSearchBar") as HTMLInputElement);

    // key event on search bar
    movieSearchBar.onkeyup = event => {
        if (event.key == 'Enter') {

          this.moviesMap.clear();

          this.subscription = forkJoin([
              this.movieService.getMoviesByKeyword(movieSearchBar.value),
              this.movieService.getMoviesByKeywordFromImdb(movieSearchBar.value)
            ]).subscribe(([movies, data]) => {

              movies.forEach(movie => {
                this.updateOverallRating(movie);
                this.moviesMap.set(movie.title, movie);
              });

              if (data['d']) {
                data['d'].forEach(imdbMovie => {
                  const movie = MovieListComponent.convertImdbMovieToModel(imdbMovie);
                  this.moviesMap.set(movie.title, movie);
                });
              }

              this.movies = Array.from(this.moviesMap.values());
          })
        }
    }
  }

  public updateOverallRating(movie: Movie): void {
    if (movie.ratings == null || movie.ratings.length == 0) return;
    let sum = 0;
    movie.ratings.forEach(rating => sum += rating.value);
    movie.overallRating = sum / movie.ratings.length;
  }

  private mergeToMap(movie: Movie): void {
    if (this.moviesMap[movie.title]) {
      /// TODO: make movies merge

      return;
    }
    this.moviesMap.set(movie.title, movie);
  }

  private static convertImdbMovieToModel(imdbMovie: any): Movie {
    const movie = new Movie;
    if (imdbMovie['l']) movie.title = imdbMovie['l'];
    if (imdbMovie['s']) movie.description = imdbMovie['s'];
    if (imdbMovie['i'] && imdbMovie['i']['imageUrl']) movie.imageUrl = imdbMovie['i']['imageUrl'];
    if (imdbMovie['rank']) movie.rank = imdbMovie['rank'];
    if (imdbMovie['s']) movie.actors = imdbMovie['s'];
    if (imdbMovie['y']) movie.year = imdbMovie['y'];
    return movie;
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.imdbSubscription){
      this.imdbSubscription.unsubscribe();
    }
  }
}
