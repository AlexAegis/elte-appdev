package hu.elte.assignment.service;

import hu.elte.assignment.data.model.User;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;

import static java.util.Optional.ofNullable;

@Service
final class InMemoryUsers implements UserCrudService {

	Map<Integer, User> users = new HashMap<>();

	@Override
	public User save(final User user) {
		return users.put(user.getId(), user);
	}

	@Override
	public Optional<User> find(final Integer id) {
		return ofNullable(users.get(id));
	}

	@Override
	public Optional<User> findByUsername(final String username) {
		return users
				.values()
				.stream()
				.filter(u -> Objects.equals(username, u.getUsername()))
				.findFirst();
	}
}
