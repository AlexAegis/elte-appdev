package hu.elte.assignment.service.auth;

import io.jsonwebtoken.Claims;

import java.util.Map;

/**
 * Creates and validates credentials.
 */
public interface TokenService {

	String permanent(Map<String, ?> attributes);

	String expiring(Map<String, ?> attributes);

	/**
	 * Checks the validity of the given credentials.
	 *
	 * @param token
	 * @return attributes if verified
	 */
	Claims untrusted(String token);

	/**
	 * Checks the validity of the given credentials.
	 *
	 * @param token
	 * @return attributes if verified
	 */
	Claims verify(String token);
}