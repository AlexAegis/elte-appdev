package hu.elte.assignment.data.model.user;

import com.fasterxml.jackson.annotation.JsonIgnore;
import hu.elte.assignment.data.model.Base;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
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

	@LazyCollection(LazyCollectionOption.FALSE)
	@OneToMany(mappedBy = "group")
	private List<Authority> authorities = new ArrayList<>();

}
