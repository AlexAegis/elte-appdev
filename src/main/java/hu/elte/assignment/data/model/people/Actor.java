package hu.elte.assignment.data.model.people;

import com.fasterxml.jackson.annotation.JsonIgnore;
import hu.elte.assignment.data.model.Base;
import hu.elte.assignment.data.model.theatre.Movie;
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
public class Actor extends Base implements Serializable {

	private static final long serialVersionUID = -3767571710940979896L;

	@OneToOne(cascade = CascadeType.ALL, optional = false)
	private Person person;

	@JsonIgnore
	@ManyToMany(mappedBy = "actors")
	private List<Movie> participates = new ArrayList<>();

}
