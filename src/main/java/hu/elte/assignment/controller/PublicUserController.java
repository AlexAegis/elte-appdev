package hu.elte.assignment.controller;

import com.google.common.hash.Hashing;
import hu.elte.assignment.data.dto.user.UserDTO;
import hu.elte.assignment.data.repository.user.UserRepository;
import lombok.experimental.FieldDefaults;
import hu.elte.assignment.data.model.user.User;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.nio.charset.StandardCharsets;

import static lombok.AccessLevel.PRIVATE;

@RestController
@RequestMapping("/rest/public/user")
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
	ResponseEntity<String> register(@RequestBody() final User user) {
		try {
			System.out.println("REGISTRATONNN! BEF PASS" + user);
			// System.out.println("REGISTRATONNN! DTO" + userDTO);
			//User user = modelMapper.map(userDTO, User.class);
			user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
			System.out.println("REGISTRATONNN! CONVO" + user);
			userRepository.save(user);
			return ResponseEntity.ok("");
		} catch(Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("SMD");
		}
	}

}