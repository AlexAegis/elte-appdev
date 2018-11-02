package hu.elte.assignment.controller;

import hu.elte.assignment.data.model.user.User;
import hu.elte.assignment.data.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/rest/")
public class UserController {

	private final UserRepository userRepository;

	@Autowired
	public UserController(UserRepository userRepository) {
		this.userRepository = userRepository;
	}

	@RequestMapping("/user")
	public Iterable<User> getAllUser() {
		return userRepository.findAll();
	}

}
