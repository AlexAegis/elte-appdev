package hu.elte.assignment.data.model.user;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import hu.elte.assignment.data.model.Base;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.xml.bind.annotation.XmlRootElement;
import java.io.Serializable;

import static java.util.Objects.requireNonNull;

@Getter
@Setter
@Entity
@NoArgsConstructor
@XmlRootElement
@EqualsAndHashCode(callSuper = true)
public class Authority extends Base implements GrantedAuthority, Serializable {

	private static final long serialVersionUID = 1027108058485350398L;

	@JsonIgnore
	@ManyToOne
	private AuthorityGroup group;

	private String authority;

	@Builder
	@JsonCreator
	public Authority(@JsonProperty("authority") final String authority) {
		super();
		this.authority = requireNonNull(authority);
	}

	@Override
	public String getAuthority() {
		return authority;
	}
}
