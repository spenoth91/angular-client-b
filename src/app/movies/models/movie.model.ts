import {Rating} from "./rating.model";

export class Movie {
  id: number;
  title: string;
  duration: number;
  year: number;
  director: string;
  category: string;
  ratings: Rating[];
  overallRating: number|null;
  imageUrl: string;
  description: string;
  rank: number;
  actors: string;
  fromImdb: boolean = false;
}
