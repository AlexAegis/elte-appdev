package hu.elte.assignment.controller;

import hu.elte.assignment.data.model.theatre.Movie;
import hu.elte.assignment.data.repository.theatre.CinemaRepository;
import hu.elte.assignment.data.repository.theatre.MovieRepository;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

import static lombok.AccessLevel.PRIVATE;

@RestController
@RequestMapping("/rest/cinema")
@FieldDefaults(level = PRIVATE, makeFinal = true)
public class CinemaController {

	MovieRepository movieRepository;
	CinemaRepository cinemaRepository;

	@Autowired
	public CinemaController(MovieRepository movieRepository, CinemaRepository cinemaRepository) {
		this.movieRepository = movieRepository;
		this.cinemaRepository = cinemaRepository;
	}

	@GetMapping("/movie")
	public ResponseEntity<Iterable<Movie>> readMovies(@RequestBody String filter) {
		return ResponseEntity.ok(this.movieRepository.findAll());
	}

	@GetMapping("/movie/{id}")
	public ResponseEntity<Movie> readMovie(@PathVariable Integer id) {
		return this.movieRepository.findById(id)
				.map(ResponseEntity::ok)
				.orElseGet(() -> ResponseEntity.noContent().build());
	}

	@PostMapping("/movie")
	public ResponseEntity<Movie> createMovie(@Valid @RequestBody() Movie movie) {
		return ResponseEntity.ok(this.movieRepository.save(movie));
	}

	@DeleteMapping("/movie/{id}")
	public void deleteMovie(@PathVariable Integer id) {
		this.movieRepository.deleteById(id);
	}

	@PutMapping("/movie")
	public Movie updateMovie(@Valid @RequestBody() Movie movie) {
		return this.movieRepository.save(movie);
	}


}
