package hu.elte.assignment.service;


import hu.elte.assignment.data.model.User;

import java.util.Optional;

/**
 * User security operations like login and logout, and CRUD operations on {@link User}.
 *
 * @author jerome
 */
public interface UserCrudService {

	User save(User user);

	Optional<User> find(Integer id);

	Optional<User> findByUsername(String username);

	Optional<User> remove(Integer id);
}