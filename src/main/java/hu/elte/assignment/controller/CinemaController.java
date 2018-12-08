package hu.elte.assignment.controller;

import hu.elte.assignment.api.Message;
import hu.elte.assignment.api.Response;
import hu.elte.assignment.config.DTO;
import hu.elte.assignment.data.dto.theatre.MovieDTO;
import hu.elte.assignment.data.dto.validation.AvailablePayload;
import hu.elte.assignment.data.model.theatre.Movie;
import hu.elte.assignment.data.repository.theatre.CinemaRepository;
import hu.elte.assignment.data.repository.theatre.MovieRepository;
import lombok.experimental.FieldDefaults;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

import static lombok.AccessLevel.PRIVATE;

@RestController
@RequestMapping("/rest/movies")
@FieldDefaults(level = PRIVATE, makeFinal = true)
public class CinemaController {

	MovieRepository movieRepository;
	CinemaRepository cinemaRepository;
	ModelMapper modelMapper;

	@Autowired
	public CinemaController(MovieRepository movieRepository, CinemaRepository cinemaRepository, ModelMapper modelMapper) {
		this.movieRepository = movieRepository;
		this.cinemaRepository = cinemaRepository;
		this.modelMapper = modelMapper;
	}


	@GetMapping("/")
	public ResponseEntity<Iterable<Movie>> readMovies() {
		return ResponseEntity.ok(this.movieRepository.findAll());
	}

	@GetMapping("/{id}")
	public ResponseEntity<Movie> readMovie(@PathVariable("id") Integer id) {
		return this.movieRepository.findById(id)
				.map(ResponseEntity::ok)
				.orElseGet(() -> ResponseEntity.noContent().build());
	}

	@PreAuthorize("hasAuthority('WRITE')")
	@PostMapping("/")
	public ResponseEntity<Movie> createMovie(@Valid @RequestBody() MovieDTO movieDTO) {
		Movie movie = modelMapper.map(movieDTO, Movie.class);
		return ResponseEntity.ok(this.movieRepository.save(movie));
	}

	@DeleteMapping("/{id}")
	public void deleteMovie(@PathVariable("id") Integer id) {
		this.movieRepository.deleteById(id);
	}

	@PutMapping("/")
	public Movie updateMovie(@DTO(MovieDTO.class) @Valid @RequestBody() Movie movie) {
		//Movie movie = modelMapper.map(movieDTO, Movie.class);
		return this.movieRepository.save(movie);
	}

	@GetMapping("/validation/available/{title}")
	public ResponseEntity<Response<AvailablePayload>> available(@PathVariable("title") String title) {
		return ResponseEntity.ok(Response.<AvailablePayload>builder().data(new AvailablePayload(this.movieRepository.findByTitle(title).isPresent())).build());
	}

}
