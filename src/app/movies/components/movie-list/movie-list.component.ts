import {Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from "@angular/core";
import {Movie} from "../../models/movie.model";
import {Observable, Subscription} from "rxjs";
import {MovieService} from "../../services/movie.service";
import { forkJoin } from 'rxjs';
import {RatingService} from "../../services/rating.service";
import {RatingSaveTO} from "../../models/rating-save-to";
import {NgbRating} from "@ng-bootstrap/ng-bootstrap";
import {MovieSaveTO} from "../../models/movie-save-to";

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.components.css']
})
export class MovieListComponent implements OnInit, OnDestroy {
  movies: Movie[];
  moviesMap: Map<string, Movie>;
  isDialogVisible = false;
  movieNames = [];
  selectedMovieName = "";
  rate: number = 0;
  movieAndRate: Observable<{}>;
  private subscription: Subscription;
  private imdbSubscription: Subscription;
  private ratingSubscription: Subscription;
  private movieSubscription: Subscription;

  constructor(private movieService: MovieService,
              private ratingService: RatingService) { }

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
                  movie.fromImdb = true;
                  this.mergeToMap(movie);
                });
              }

              this.movies = Array.from(this.moviesMap.values());
              this.movieNames = Array.from(this.moviesMap.keys());
          })
        }
    }
  }

  public saveRating() {
    if (this.selectedMovieName.length > 0) {
      let movie = this.moviesMap.get(this.selectedMovieName);
      let ratingSaveTO = new RatingSaveTO();
      ratingSaveTO.movieId = movie.id;
      ratingSaveTO.value = this.rate;
      ratingSaveTO.comment = (document.getElementById("movieSearchBar") as HTMLInputElement).value;

      // if not in our database then save the movie and the rating
      if (movie.fromImdb  && !movie.id) {
        console.log("new movie + rating");
        let movieSaveTO = new MovieSaveTO();
        movieSaveTO.title = movie.title;
        movieSaveTO.duration = 2; // default value
        movieSaveTO.year = 2010; // default value
        movieSaveTO.director = "Sanyi bácsi"; // default value
        movieSaveTO.category = "unlisted";


        this.movieSubscription = this.movieService.saveMovie(movieSaveTO).subscribe(
          a => {
            /// to be finished
            this.ratingSubscription = this.ratingService.saveRating(ratingSaveTO).subscribe();
          }
        );
      }
      // else update only the rating
      else {
        console.log("update rating");
        this.ratingSubscription = this.ratingService.updateRating(ratingSaveTO).subscribe();
      }
    }
  }

  public popUpDialog(title: string) {
    this.selectedMovieName = title;
    this.isDialogVisible = true;
  }

  public updateOverallRating(movie: Movie): void {
    if (movie.ratings.length === 0) return;
    let sum = 0;
    movie.ratings.forEach(rating => sum += rating.value);
    movie.overallRating = sum / movie.ratings.length;
  }

  private mergeToMap(movie: Movie): void {
    if (this.moviesMap.has(movie.title)) {
      let temp = this.moviesMap.get(movie.title);
      if (!temp.duration) temp.duration = movie.duration;
      if (!temp.year) temp.year = movie.year;
      if (!temp.director) temp.director = movie.director;
      if (!temp.category) temp.category = movie.category;
      if (!temp.ratings) temp.ratings = movie.ratings;
      if (!temp.imageUrl) temp.imageUrl = movie.imageUrl;
      if (!temp.description) temp.description = movie.description;
      if (!temp.rank) temp.rank = movie.rank;
      if (!temp.actors) temp.actors = movie.actors;
      if (!temp.fromImdb) temp.fromImdb = movie.fromImdb;
      this.moviesMap.set(movie.title, temp);
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
    if (this.imdbSubscription) {
      this.imdbSubscription.unsubscribe();
    }
    if (this.ratingSubscription) {
      this.ratingSubscription.unsubscribe();
    }
    if (this.movieSubscription) {
      this.movieSubscription.unsubscribe();
    }
  }
}
