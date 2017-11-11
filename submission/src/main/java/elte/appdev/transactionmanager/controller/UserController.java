package elte.appdev.transactionmanager.controller;

import elte.appdev.transactionmanager.model.User;
import elte.appdev.transactionmanager.service.UserService;
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
    public Response<User> login(@RequestParam("username") String username, @RequestParam("password") String password) {
        Optional<User> user = userService.login(username, password);
        return user.map(Response::ok).orElse(Response.error("Login failed", null));
    }

    @RequestMapping(method = RequestMethod.POST, value = "/register")
    public Response<User> register(String username, String password) {
        Optional<User> newUser = userService.register(username, password);
        return newUser.map(user -> login(username, password)).orElse(Response.error("Registration failed", null));
    }
}