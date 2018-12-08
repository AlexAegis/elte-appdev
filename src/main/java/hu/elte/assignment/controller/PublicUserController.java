package hu.elte.assignment.controller;

import hu.elte.assignment.api.Message;
import hu.elte.assignment.api.MessageType;
import hu.elte.assignment.api.Response;
import hu.elte.assignment.data.dto.validation.AvailablePayload;
import hu.elte.assignment.data.model.user.User;
import hu.elte.assignment.data.repository.user.UserRepository;
import lombok.experimental.FieldDefaults;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import static lombok.AccessLevel.PRIVATE;

@RestController
@RequestMapping("/rest/public/users")
@FieldDefaults(level = PRIVATE, makeFinal = true)
final class PublicUserController {

	UserRepository userRepository;

	ModelMapper modelMapper;

	PasswordEncoder bCryptPasswordEncoder;

	@Autowired
	public PublicUserController(UserRepository userRepository, ModelMapper modelMapper, @Lazy PasswordEncoder bCryptPasswordEncoder) {
		this.userRepository = userRepository;
		this.modelMapper = modelMapper;
		this.bCryptPasswordEncoder = bCryptPasswordEncoder;
	}

	/**
	 * Later the hashing will be taken out from here since that's the clients job
	 *
	 * @return response for the login
	 */
	@PostMapping("/register")
	ResponseEntity<Response<User>> register(@RequestBody() final User user) {
		try {
			if (this.userRepository.findByUsername(user.getUsername()).isPresent()) {
				throw new UserNotAvailableException();
			}
			user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
			userRepository.save(user);
			return ResponseEntity.ok(Response.<User>builder().data(user).build());
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body(Response.<User>builder().message(Message.builder().target("username").message(e.getMessage()).build()).build());
		}//
	}

	class UserNotAvailableException extends Exception {
		UserNotAvailableException() {
			super("username_not_available");
		}
	}

	@GetMapping("/validation/available/{username}")
	ResponseEntity<Response<AvailablePayload>> available(@PathVariable("username") final String username) {
		boolean present = this.userRepository.findByUsername(username).isPresent();
		Response.ResponseBuilder<AvailablePayload> res = Response.<AvailablePayload>builder().data(new AvailablePayload(!present));
		if (present) {
			res.message(Message.builder().target("username").message("username_not_available").build());
		}
		return ResponseEntity.ok(res.build());
	}


}