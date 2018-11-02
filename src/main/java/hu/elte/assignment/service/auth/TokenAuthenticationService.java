package hu.elte.assignment.service.auth;

import com.google.common.collect.ImmutableMap;
import hu.elte.assignment.data.model.user.User;
import hu.elte.assignment.data.repository.user.UserRepository;
import hu.elte.assignment.service.UserCrudService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import lombok.AllArgsConstructor;
import lombok.NonNull;
import lombok.experimental.FieldDefaults;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

import static lombok.AccessLevel.PACKAGE;
import static lombok.AccessLevel.PRIVATE;

@Service
@AllArgsConstructor(access = PACKAGE)
@FieldDefaults(level = PRIVATE, makeFinal = true)
final class TokenAuthenticationService implements UserAuthenticationService {
	@NonNull
	@Autowired
	JWTTokenService jwtTokenService;
	@NonNull
	@Autowired
	UserCrudService users;
	@Autowired
	UserRepository userRepository;

	/**
	 * Right now we store the logged in users in a service but this is an antipattern
	 * as the tokens purpose is to eliminate these session like services on the server
	 * storing the state in the token. Right now the only purpose of this is invalidating tokens.
	 *
	 * @param username
	 * @param password
	 * @return
	 */
	@Override
	public Optional<String> login(final String username, final String password) {
		try {
			// Thread.sleep(5000);
		} catch (Exception e) {

		}
		Optional.ofNullable(userRepository.findByUsernameAndPassword(username, password)).ifPresent(users::store);
		return users.findByUsername(username).filter(user -> Objects.equals(password, user.getPassword()))
				.map(user -> {
					System.out.println("FOUND" + user);
					return jwtTokenService.expiring(ImmutableMap.of("user", user));
				});
	}

	@Override
	public Optional<User> findByToken(final String token) {
		return Optional.of(jwtTokenService.verify(token)).map(claims -> (String) claims.get("user", LinkedHashMap.class).get("username")).flatMap(users::findByUsername);
	}

	/**
	 * Keep a token blacklist on logout, on every logout check if there are expired ones and discard them.
	 *
	 * On the config check if the incoming token is blacklisted or not
	 * @param user the user to logout
	 */
	@Override
	public void logout(final User user) {
		users.remove(user.getId());
		System.out.println("Logging out");
		// Nothing to do
	}
}