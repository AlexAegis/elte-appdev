import { Payload } from '../payload.interface';
import { Movie } from 'src/app/model/movie/movie.interface';
const url = `rest/movies/`;
export { url };
export interface MoviesResponse extends Payload, Array<Movie> {}
