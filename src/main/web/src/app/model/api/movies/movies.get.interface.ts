import { Movie } from './../../movie/movie.interface';
import { Payload } from '../payload.interface';
const url = `rest/movies/`;
export { url };
export interface MoviesResponse extends Payload, Array<Movie> {}
