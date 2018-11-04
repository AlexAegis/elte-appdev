package hu.elte.assignment.controller;

import com.google.common.hash.Hashing;
import hu.elte.assignment.data.dto.user.UserDTO;
import hu.elte.assignment.data.repository.user.UserRepository;
import lombok.experimental.FieldDefaults;
import hu.elte.assignment.data.model.user.User;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.charset.StandardCharsets;

import static lombok.AccessLevel.PRIVATE;

@RestController
@RequestMapping("/rest/public/users")
@FieldDefaults(level = PRIVATE, makeFinal = true)
final class PublicUserController {

	UserRepository userRepository;

	ModelMapper modelMapper;

	@Autowired
	public PublicUserController(UserRepository userRepository, ModelMapper modelMapper) {
		this.userRepository = userRepository;
		this.modelMapper = modelMapper;
	}

	/**
	 * Later the hashing will be taken out from here since that's the clients job
	 *
	 * @return response for the login
	 */
	@PostMapping("/register")
	ResponseEntity<String> register(@RequestBody() final UserDTO userDTO) {
		User user = modelMapper.map(userDTO, User.class);
		user.setPassword(Hashing.sha256().hashString(user.getPassword(), StandardCharsets.UTF_8).toString());
		userRepository.save(user);
		return null;
	}

}