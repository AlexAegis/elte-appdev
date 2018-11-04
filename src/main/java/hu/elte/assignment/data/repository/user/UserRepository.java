package hu.elte.assignment.data.repository.user;

import hu.elte.assignment.data.model.user.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends CrudRepository<User, Integer> {

	User findByUsernameAndPassword(String username, String password);

	User findByUsername(String username);

}