package hu.elte.assignment.controller;

import com.google.common.hash.Hashing;
import hu.elte.assignment.data.repository.UserRepository;
import hu.elte.assignment.service.auth.UserAuthenticationService;
import lombok.AllArgsConstructor;
import lombok.NonNull;
import lombok.experimental.FieldDefaults;
import hu.elte.assignment.data.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.nio.charset.StandardCharsets;

import static lombok.AccessLevel.PACKAGE;
import static lombok.AccessLevel.PRIVATE;

@RestController
@RequestMapping("/public/users")
@FieldDefaults(level = PRIVATE, makeFinal = true)
@AllArgsConstructor(access = PACKAGE)
final class PublicUsersController {


	@NonNull
	UserAuthenticationService authentication;
	@Autowired
	UserRepository userRepository;

	/**
	 * Later the hashing will be taken out from here since that's the clients job
	 * @param username
	 * @param password
	 * @return
	 */
	@PostMapping("/register")
	String register(@RequestParam("username") final String username, @RequestParam("password") final String password) {
		userRepository.save(User.builder().username(username).password(Hashing.sha256()
				.hashString(password, StandardCharsets.UTF_8)
				.toString()).build());
		return login(username, password);
	}

	/**
	 * Later the hashing will be taken out from here since that's the clients job
	 * @param username
	 * @param password
	 * @return
	 */
	@PostMapping("/login")
	String login(@RequestParam("username") final String username, @RequestParam("password") final String password) {
		return authentication.login(username, Hashing.sha256()
				.hashString(password, StandardCharsets.UTF_8)
				.toString())
				.orElseThrow(() -> new RuntimeException("invalid login and/or password"));
	}
}