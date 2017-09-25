package elte.alexaegis.appdev.repository;

import elte.alexaegis.appdev.model.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Created by alexaegis on 2017. 09. 25..
 */
@Repository
public interface UserRepository extends CrudRepository<User, Integer> {
    Optional<User> findByUsername(String username);
}