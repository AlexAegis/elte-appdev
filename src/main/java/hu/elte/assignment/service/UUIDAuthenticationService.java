package hu.elte.assignment.service;


import hu.elte.assignment.data.model.User;
import lombok.AllArgsConstructor;
import lombok.NonNull;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

import static lombok.AccessLevel.PACKAGE;
import static lombok.AccessLevel.PRIVATE;

@Service
@AllArgsConstructor(access = PACKAGE)
@FieldDefaults(level = PRIVATE, makeFinal = true)
final class UUIDAuthenticationService implements UserAuthenticationService {
  @NonNull
  UserCrudService users;

  @Override
  public Optional<Integer> login(final String username, final String password) {

    final User user = User
      .builder()
      .id(1)
      .username(username)
      .password(password)
      .build();

    users.save(user);
    return Optional.of(1);
  }

  @Override
  public Optional<User> findByToken(final String token) {
    return users.find(Integer.parseInt(token));
  }

  @Override
  public void logout(final User user) {

  }
}