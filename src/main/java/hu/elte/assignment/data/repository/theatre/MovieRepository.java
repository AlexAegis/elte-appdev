package hu.elte.assignment.data.repository.theatre;

import hu.elte.assignment.data.model.theatre.Movie;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MovieRepository extends CrudRepository<Movie, Integer> {
}
