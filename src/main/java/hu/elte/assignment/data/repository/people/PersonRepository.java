package hu.elte.assignment.data.repository.people;

import hu.elte.assignment.data.model.people.Person;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PersonRepository extends CrudRepository<Person, Integer> {

}
