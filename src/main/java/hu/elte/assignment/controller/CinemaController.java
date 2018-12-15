package hu.elte.assignment.controller;

import hu.elte.assignment.api.Response;
import hu.elte.assignment.config.DTO;
import hu.elte.assignment.data.dto.theatre.MovieDTO;
import hu.elte.assignment.data.dto.validation.AvailablePayload;
import hu.elte.assignment.data.model.theatre.Movie;
import hu.elte.assignment.data.model.user.User;
import hu.elte.assignment.data.repository.theatre.MovieRepository;
import lombok.experimental.FieldDefaults;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

import static lombok.AccessLevel.PRIVATE;

@RestController
@RequestMapping("/rest/movies")
@FieldDefaults(level = PRIVATE, makeFinal = true)
public class CinemaController {

	MovieRepository movieRepository;
	ModelMapper modelMapper;

	@Autowired
	public CinemaController(MovieRepository movieRepository, ModelMapper modelMapper) {
		this.movieRepository = movieRepository;
		this.modelMapper = modelMapper;
	}


	@GetMapping("/")
	public ResponseEntity<Iterable<Movie>> readMovies(@AuthenticationPrincipal User user) {
		return ResponseEntity.ok(this.movieRepository.findAllByOwner(user));
	}

	@GetMapping("/{id}")
	public ResponseEntity<Movie> readMovie(@PathVariable("id") Integer id) {
		return this.movieRepository.findById(id)
				.map(ResponseEntity::ok)
				.orElseGet(() -> ResponseEntity.noContent().build());
	}

	@PreAuthorize("hasAuthority('USER')")
	@PostMapping("/")
	public ResponseEntity<Movie> createMovie(@Valid @RequestBody() Movie movie, @AuthenticationPrincipal User user) {
		System.out.println("HEYJOOOO");
		movie.setOwner(user);
		System.out.println(movie);
		//Movie movie = modelMapper.map(movieDTO, Movie.class);
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

	@PreAuthorize("hasAuthority('ADMIN')")
	@GetMapping("/count")
	public ResponseEntity<Response<Long>> count() {
		return ResponseEntity.ok(Response.<Long>builder().data(this.movieRepository.count()).build());
	}

	@GetMapping("/count-own")
	public ResponseEntity<Response<Long>> countOwn(@AuthenticationPrincipal User user) {
		return ResponseEntity.ok(Response.<Long>builder().data(this.movieRepository.countAllByOwner(user)).build());
	}

}
