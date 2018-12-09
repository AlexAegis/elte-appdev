import { Payload } from '../payload.interface';
import { Movie } from 'src/app/model/movie/movie.interface';
const url = (id: number = undefined) => `rest/movies/${id ? id : ''}`;

export { url };
export interface MoviesResponse extends Array<Movie> {}

export interface MovieResponse extends Movie {}
