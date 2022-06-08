export class APIEndpointURLs {
  private static readonly baseUrl = '/java-api/api';

  // User
  public static readonly userUrl = APIEndpointURLs.baseUrl + '/user';
  public static readonly allUser = APIEndpointURLs.userUrl + '/all';

  // Movies
  public static readonly movieUrl = APIEndpointURLs.baseUrl + '/movie';
  public static readonly keywordMoviesUrl = APIEndpointURLs.movieUrl + '/k/';
  public static readonly saveMovie = APIEndpointURLs.movieUrl + '/save';

  // Ratings
  public static readonly ratingUrl = APIEndpointURLs.baseUrl + '/rating';
  public static readonly saveRating = APIEndpointURLs.ratingUrl + '/save';
  public static readonly updateRating = APIEndpointURLs.ratingUrl + '/update';

  // Movies from Rapid API (imdb)
  public static readonly searchMoviesUrlEmptyKeyword = 'https://online-movie-database.p.rapidapi.com/auto-complete?q=';

  // Rapid API headers
  public static readonly HOST_NAME = "X-RapidAPI-Host";
  public static readonly HOST_VALUE = "online-movie-database.p.rapidapi.com";
  public static readonly HOST_KEY_NAME = "X-RapidAPI-Key";
  public static readonly HOST_KEY_VALUE = "bf3cf06b49mshbad37dd9468fefdp15591ajsn9f5714f2ae61";
  public static readonly ACCESS_CONTROL = "Access-Control-Allow-Origin";
  public static readonly ACCESS_CONTROL_ANY = '*';

  // Auth
  public static readonly authUrl = APIEndpointURLs.baseUrl + '/auth';
  public static readonly registerUrl = APIEndpointURLs.authUrl + '/register';
  public static readonly loginUrl = APIEndpointURLs.authUrl + '/login';
}
