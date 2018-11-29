package hu.elte.assignment.data.model.theatre;

import hu.elte.assignment.data.model.Base;
import hu.elte.assignment.data.model.people.Person;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.xml.bind.annotation.XmlRootElement;
import java.io.Serializable;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@XmlRootElement
@EqualsAndHashCode(callSuper = true)
public class Ticket extends Base implements Serializable {

	private static final long serialVersionUID = -5524258922092884435L;

	private Boolean paid;
	private Float price;
	@ManyToOne
	private Person owner;
	@ManyToOne
	private Screening screening;
}
