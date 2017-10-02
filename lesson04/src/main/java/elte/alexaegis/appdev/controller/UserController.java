package elte.alexaegis.appdev.controller;

import elte.alexaegis.appdev.model.User;
import elte.alexaegis.appdev.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("api/user")
public class UserController {

    @Autowired
    private UserService userService;

    @RequestMapping(method = RequestMethod.POST, value = "/login")
    public User login(@RequestParam("username") String username, @RequestParam("password") String password) {
        Optional<User> user = userService.login(username, password);
        return user.get();
    }

}