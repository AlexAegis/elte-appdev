package hu.elte.assignment.service;


import hu.elte.assignment.data.model.user.User;
import hu.elte.assignment.data.repository.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;


@Service
@Primary
public class UserServiceBean implements UserDetailsService {
    private final UserRepository userRepository;

    @Autowired
    public UserServiceBean(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) {
        UserDetails user = (UserDetails) userRepository.findByUsername(username);
        System.out.println("AASDADAWDWDWFJEWNFEUIEII II II II" + user + " " +user.getUsername());
        if(user == null) {
            throw new UsernameNotFoundException(String.format("The username %s doesn't exist", username));
        }
        return user;
    }
}