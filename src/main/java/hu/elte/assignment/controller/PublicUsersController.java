package hu.elte.assignment.controller;

import com.google.common.hash.Hashing;
import hu.elte.assignment.data.repository.user.UserRepository;
import hu.elte.assignment.service.auth.UserAuthenticationService;
import lombok.AllArgsConstructor;
import lombok.NonNull;
import lombok.experimental.FieldDefaults;
import hu.elte.assignment.data.model.user.User;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

	UserRepository userRepository;

	@Autowired
	public PublicUsersController(UserRepository userRepository, UserAuthenticationService authentication) {
		this.userRepository = userRepository;
		this.authentication = authentication;
	}

	/**
	 * Later the hashing will be taken out from here since that's the clients job
	 *
	 * @return response for the login
	 */
	@PostMapping("/register")
	ResponseEntity<String> register(@RequestBody() final User user) {
		user.setPassword(Hashing.sha256().hashString(user.getPassword(), StandardCharsets.UTF_8).toString());
		userRepository.save(user);
		return login(user);
	}

	/**
	 * Later the hashing will be taken out from here since that's the clients job
	 * 
	 * @param user
	 * @return
	 */
	@PostMapping("/login")
	ResponseEntity<String> login(@RequestBody() final User user) {
		String token = authentication.login(user.getUsername(), Hashing.sha256().hashString(user.getPassword(), StandardCharsets.UTF_8).toString())
				.orElse(null);
		System.out.println(token);
		if(token == null) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
		} else {
			JSONObject result = new JSONObject()
					.put("token", token)
					.put("refreshToken", token);
			return ResponseEntity.ok(result.toString());
		}

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