package elte.alexaegis.appdev.service;

import elte.alexaegis.appdev.model.User;
import elte.alexaegis.appdev.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public Optional<User> login(String username, String password) {
        return userRepository.findByUsername(username).filter(user -> user.password.equals(password));
    }

}