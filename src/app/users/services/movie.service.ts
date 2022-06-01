import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Movie} from "../models/movie.model";
import {APIEndpointURLs} from "../../api-endpoint-urls";
import {ConsoleLogger} from "@angular/compiler-cli/ngcc";

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private readonly imdbHeaders;

  constructor(private http: HttpClient)
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

  public getMoviesByKeyword(keyword: string): Observable<any[]> {
    return this.http.get<any[]>(APIEndpointURLs.searchMoviesUrlEmptyKeyword + keyword,
      {headers: this.imdbHeaders});
  }
}
