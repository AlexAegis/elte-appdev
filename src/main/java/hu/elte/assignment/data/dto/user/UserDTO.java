package hu.elte.assignment.data.dto.user;

import com.fasterxml.jackson.annotation.JsonIgnore;
import hu.elte.assignment.data.dto.people.PersonDTO;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collection;

@Data
public class UserDTO implements UserDetails, Serializable {

	private static final long serialVersionUID = -4926161351678648644L;

	private Integer id;
	
	private String username;

	@JsonIgnore
	private String password;

	private Boolean active = true;

	private String specialKey;

	private PersonDTO person;

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return new ArrayList<>();
	}

	@Override
	public String getPassword() {
		return password;
	}

	@Override
	public String getUsername() {
		return username;
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return active;
	}
}
