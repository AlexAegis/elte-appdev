package hu.elte.assignment.logic.service;

import hu.elte.assignment.data.dto.user.UserDTO;
import hu.elte.assignment.data.model.user.User;
import hu.elte.assignment.data.repository.user.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.context.annotation.Primary;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@Primary
public class UserServiceBean implements UserDetailsService {
	private final UserRepository userRepository;
	private final ModelMapper modelMapper;

	@Autowired
	public UserServiceBean(UserRepository userRepository, @Lazy ModelMapper modelMapper) {
		this.userRepository = userRepository;
		this.modelMapper = modelMapper;
	}


	@Override
	public User loadUserByUsername(String username) {
		User user = userRepository.findByUsername(username).orElse(null);
		if (user == null) {
			throw new UsernameNotFoundException(String.format("The username %s doesn't exist", username));
		}
		return user;
	}
}