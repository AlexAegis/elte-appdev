package elte.appdev.transactionmanager.service;

import elte.appdev.transactionmanager.model.Person;
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
        return userRepository.findByUsername(username).filter(user -> user.getPassword().equals(password));
    }

    /**
     * TODO: create and store a person for the user
     * @param username for the new user
     * @param password for the new user
     * @return the optional new user
     */
    public Optional<User> register(String username, String password, Person person) {
        Optional<User> existingUser = userRepository.findByUsername(username);
        if (!existingUser.isPresent()) {
            User newUser = new User();
            newUser.setUsername(username);
            newUser.setPassword(password);
            newUser.setPerson(person);
            userRepository.save(newUser);
            return Optional.of(newUser);
        } else return Optional.empty();
    }
}