package hu.elte.assignment.data.model.user;

import com.fasterxml.jackson.annotation.JsonIgnore;
import hu.elte.assignment.data.model.Base;
import lombok.*;

import javax.persistence.*;
import javax.xml.bind.annotation.XmlRootElement;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@XmlRootElement
@EqualsAndHashCode(callSuper = true)
public class AuthorityGroup extends Base implements Serializable {

	private static final long serialVersionUID = -3314538861697002120L;

	@Column(nullable = false)
	private String name;

	@ManyToMany
	@JsonIgnore
	private List<User> users;

	@OneToMany(mappedBy = "group")
	private List<Authority> authorities = new ArrayList<>();

}
