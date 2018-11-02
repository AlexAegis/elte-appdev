package hu.elte.assignment.data.model.user;

import hu.elte.assignment.data.model.Base;
import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.xml.bind.annotation.XmlRootElement;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collection;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@ToString
@XmlRootElement
@EqualsAndHashCode(callSuper = true)
public class AuthorityGroup extends Base implements Serializable {

	private static final long serialVersionUID = -3314538861697002120L;

	@Column(nullable = false)
	private String name;

	@ManyToMany()
	private Collection<User> user;

	@OneToMany(mappedBy = "group")
	private Collection<Authority> authorities = new ArrayList<>();

}
