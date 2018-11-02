package hu.elte.assignment.controller;

import com.google.common.hash.Hashing;
import hu.elte.assignment.data.repository.UserRepository;
import hu.elte.assignment.service.auth.UserAuthenticationService;
import lombok.AllArgsConstructor;
import lombok.NonNull;
import lombok.experimental.FieldDefaults;
import hu.elte.assignment.data.model.User;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.nio.charset.StandardCharsets;

import static lombok.AccessLevel.PACKAGE;
import static lombok.AccessLevel.PRIVATE;

@RestController
@RequestMapping("/rest/public/users")
@FieldDefaults(level = PRIVATE, makeFinal = true)
@AllArgsConstructor(access = PACKAGE)
final class PublicUsersController {

	@NonNull
	UserAuthenticationService authentication;
	@Autowired
	UserRepository userRepository;

	/**
	 * Later the hashing will be taken out from here since that's the clients job
	 * 
	 * @param username
	 * @param password
	 * @return
	 */
	@PostMapping("/register")
	String register(@RequestParam("username") final String username, @RequestParam("password") final String password) {
		userRepository.save(User.builder().username(username)
				.password(Hashing.sha256().hashString(password, StandardCharsets.UTF_8).toString()).build());
		return login(new User(username, password));
	}

	/**
	 * Later the hashing will be taken out from here since that's the clients job
	 * 
	 * @param user
	 * @return
	 */
	@PostMapping("/login")
	String login(@RequestBody() final User user) {
		String token = authentication.login(user.getUsername(), Hashing.sha256().hashString(user.getPassword(), StandardCharsets.UTF_8).toString())
				.orElse(null);

		JSONObject result = new JSONObject()
				.put("token", token)
				.put("refreshToken", token);
		return result.toString();
	}

	@PostMapping("/test")
	String test(@RequestBody() final Test test) {
		System.out.println(test);
		return test.toString();
	}


	/**
	 *
	 * @return
	 */
	@GetMapping("/")
	Iterable<User> test() {
		return userRepository.findAll();
	}
}