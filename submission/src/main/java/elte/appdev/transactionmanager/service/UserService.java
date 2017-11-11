package elte.appdev.transactionmanager.service;

import elte.appdev.transactionmanager.model.User;
import elte.appdev.transactionmanager.repository.UserRepository;
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

    public Optional<User> register(String username, String password) {
        Optional<User> existingUser = userRepository.findByUsername(username);
        if (!existingUser.isPresent()) {
            User newUser = new User();
            newUser.setUsername(username);
            newUser.setPassword(password);
            userRepository.save(newUser);
            return Optional.of(newUser);
        } else return Optional.empty();
    }
}