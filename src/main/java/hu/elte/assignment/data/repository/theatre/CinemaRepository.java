package hu.elte.assignment.data.repository.theatre;

import hu.elte.assignment.data.model.theatre.Cinema;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CinemaRepository extends CrudRepository<Cinema, Integer> {

}
