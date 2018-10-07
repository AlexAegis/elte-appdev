package hu.elte.assignment.controller;

import hu.elte.assignment.service.UserAuthenticationService;
import hu.elte.assignment.service.UserCrudService;
import lombok.AllArgsConstructor;
import lombok.NonNull;
import lombok.experimental.FieldDefaults;
import hu.elte.assignment.data.model.User;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import static lombok.AccessLevel.PACKAGE;
import static lombok.AccessLevel.PRIVATE;

@RestController
@RequestMapping("/public/users")
@FieldDefaults(level = PRIVATE, makeFinal = true)
@AllArgsConstructor(access = PACKAGE)
final class PublicUsersController {
  @NonNull
  UserAuthenticationService authentication;
  @NonNull
  UserCrudService users;

  @PostMapping("/register")
  String register(
    @RequestParam("username") final String username,
    @RequestParam("password") final String password) {
    System.out.println("ASD");
    users
      .save(
        User
          .builder()
                .id(1)
          .username(username)
          .password(password)
          .build()
      );

    return login(username, password);
  }

  @PostMapping("/login")
  String login(
    @RequestParam("username") final String username,
    @RequestParam("password") final String password) {
    return authentication
      .login(username, password)
      .orElseThrow(() -> new RuntimeException("invalid login and/or password"));
  }
}