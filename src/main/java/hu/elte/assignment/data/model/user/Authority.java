package hu.elte.assignment.data.model.user;

import hu.elte.assignment.data.model.Base;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.xml.bind.annotation.XmlRootElement;
import java.io.Serializable;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@ToString
@XmlRootElement
@EqualsAndHashCode(callSuper = true)
public class Authority extends Base implements GrantedAuthority, Serializable {

	private static final long serialVersionUID = 1027108058485350398L;

	@ManyToOne
	private AuthorityGroup group;

	private String authority;

	@Override
	public String getAuthority() {
		return authority;
	}
}
