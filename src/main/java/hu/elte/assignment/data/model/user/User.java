package hu.elte.assignment.data.model.user;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import hu.elte.assignment.data.model.Base;
import hu.elte.assignment.data.model.people.Person;
import hu.elte.assignment.data.model.theatre.Movie;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import javax.xml.bind.annotation.XmlRootElement;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

import static java.util.Objects.requireNonNull;

@Entity
@Getter
@Setter
@XmlRootElement
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class User extends Base implements UserDetails, Serializable {

	private static final long serialVersionUID = 6862128773568482456L;

	private String username;

	private String password;

	private Boolean active = true;

	private String specialKey;

	@OneToOne(cascade = CascadeType.ALL)
	private Person person;

	@JsonIgnore
	@ManyToMany(mappedBy = "users", fetch = FetchType.EAGER)
	private List<AuthorityGroup> groups = new ArrayList<>();

	@JsonIgnore
	@OneToMany(mappedBy = "owner", fetch = FetchType.LAZY)
	private List<Movie> movies = new ArrayList<>();

	@Builder
	@JsonCreator
	public User(@JsonProperty("username") final String username, @JsonProperty("password") final String password) {
		super();
		this.username = requireNonNull(username);
		this.password = requireNonNull(password);
	}

	@Override
	public Collection<GrantedAuthority> getAuthorities() {
		return groups.stream().flatMap(group -> group.getAuthorities().stream())
				.collect(Collectors.toList());
	}

	@JsonIgnore
	@Override
	public String getPassword() {
		return password;
	}

	@JsonIgnore
	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@JsonIgnore
	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@JsonIgnore
	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return active;
	}

}
