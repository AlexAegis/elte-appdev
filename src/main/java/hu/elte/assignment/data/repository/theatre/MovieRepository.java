package hu.elte.assignment.data.repository.theatre;

import hu.elte.assignment.data.model.theatre.Movie;
import hu.elte.assignment.data.model.user.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MovieRepository extends CrudRepository<Movie, Integer> {
	Optional<Movie> findByTitle(String title);
	Long countAllByOwner(User owner);
	Iterable<Movie> findAllByOwner(User owner);
}
