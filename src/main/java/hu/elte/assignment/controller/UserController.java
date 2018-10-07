package hu.elte.assignment.controller;

import hu.elte.assignment.model.User;
import hu.elte.assignment.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
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
