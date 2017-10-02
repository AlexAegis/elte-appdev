package elte.alexaegis.appdev.controller;

import elte.alexaegis.appdev.model.User;
import elte.alexaegis.appdev.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/user")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @RequestMapping("/get")
    public User get(@RequestParam("username") String username) {
        return userRepository.findByUsername(username).get();
    }
}