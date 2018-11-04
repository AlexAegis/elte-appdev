package hu.elte.assignment.controller;

import hu.elte.assignment.data.model.user.User;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

import static lombok.AccessLevel.PACKAGE;
import static lombok.AccessLevel.PRIVATE;

@RestController
@RequestMapping("/rest/users")
@FieldDefaults(level = PRIVATE, makeFinal = true)
@AllArgsConstructor(access = PACKAGE)
public final class SecuredUsersController {

	/**
	 *
	 * @param user Same as SecurityContextHolder.getContext().getAuthentication().getPrincipal();
	 * @return
	 * @throws Exception
	 */
	@GetMapping("/current")
	public Object getCurrent(@AuthenticationPrincipal User user) throws Exception {
		return user;
	}

}