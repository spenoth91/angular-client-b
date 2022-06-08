import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Movie} from "../models/movie.model";
import {APIEndpointURLs} from "../../api-endpoint-urls";
import {ConsoleLogger} from "@angular/compiler-cli/ngcc";
import {MovieSaveTO} from "../models/movie-save-to";
import {AccountService} from "../../account/components/services/account.service";
import {RatingSaveTO} from "../models/rating-save-to";

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private readonly imdbHeaders;

  constructor(private http: HttpClient,
              private auth: AccountService)
  {
    this.imdbHeaders = new HttpHeaders()
      .set(APIEndpointURLs.HOST_NAME, APIEndpointURLs.HOST_VALUE)
      .set(APIEndpointURLs.HOST_KEY_NAME, APIEndpointURLs.HOST_KEY_VALUE)
      .set(APIEndpointURLs.ACCESS_CONTROL, APIEndpointURLs.ACCESS_CONTROL_ANY)
  }

  public getGameMovies(): Observable<any[]> {
    return this.http.get<any[]>(APIEndpointURLs.searchMoviesUrlEmptyKeyword + "game",
      {headers: this.imdbHeaders});
  }

  public getMoviesByKeywordFromImdb(keyword: string): Observable<any[]> {
    return this.http.get<any[]>(APIEndpointURLs.searchMoviesUrlEmptyKeyword + keyword,
      {headers: this.imdbHeaders});
  }

  public getMoviesByKeyword(keyword: string): Observable<Movie[]> {
    return this.http.get<any[]>(APIEndpointURLs.keywordMoviesUrl + keyword);
  }

  public saveMovie(movieSaveTO: MovieSaveTO): Observable<boolean> {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.auth.getToken()
    });
    return this.http.post<boolean>(APIEndpointURLs.saveMovie,
      movieSaveTO,
      {headers});
  }

  public saveMovieThenRating(movieSaveTO: MovieSaveTO,
                             ratingSaveTO: RatingSaveTO) {

  }
}
