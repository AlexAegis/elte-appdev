package hu.elte.assignment.controller;

import hu.elte.assignment.data.model.user.User;
import lombok.experimental.FieldDefaults;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static lombok.AccessLevel.PRIVATE;

@RestController
@RequestMapping("/rest/users")
@FieldDefaults(level = PRIVATE, makeFinal = true)
public final class UserController {

	ModelMapper modelMapper;

	@Autowired
	public UserController(ModelMapper modelMapper) {
		this.modelMapper = modelMapper;
	}

	/**
	 * @param user Same as SecurityContextHolder.getContext().getAuthentication().getPrincipal();
	 * @return
	 */
	@GetMapping("/current")
	public User getCurrent(/*@DTO(UserDTO.class)*/ @AuthenticationPrincipal User user) {
		//User user = modelMapper.map(userDTO, User.class);
		System.out.println("return current user" + user);
		return user;
	}

}