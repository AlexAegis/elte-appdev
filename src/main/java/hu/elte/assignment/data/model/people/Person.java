package hu.elte.assignment.data.model.people;

import com.fasterxml.jackson.annotation.JsonIgnore;
import hu.elte.assignment.data.model.Base;
import hu.elte.assignment.data.model.theatre.Movie;
import hu.elte.assignment.data.model.theatre.Ticket;
import hu.elte.assignment.data.model.user.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

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
public class Person extends Base implements Serializable {

	private static final long serialVersionUID = -6777531118953482884L;

	@Column(nullable = false)
	private String firstName;

	@Column(nullable = false)
	private String lastName;

	@JsonIgnore
	@OneToOne(mappedBy = "person")
	private User user;

	@JsonIgnore
	@OneToMany(mappedBy = "owner")
	private List<Ticket> tickets = new ArrayList<>();

	@JsonIgnore
	@OneToOne(mappedBy = "person")
	private Actor actor;

}
