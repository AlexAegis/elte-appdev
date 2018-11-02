package hu.elte.assignment.data.model.theatre;

import hu.elte.assignment.data.model.Base;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.xml.bind.annotation.XmlRootElement;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@XmlRootElement
@EqualsAndHashCode(callSuper = true)
public class Screening extends Base implements Serializable {

	private static final long serialVersionUID = -363082001386500122L;

	@ManyToOne
	private Movie movie;

	@ManyToOne
	private Cinema cinema;

	@Temporal(TemporalType.TIMESTAMP)
	private Date date;

	@OneToMany(mappedBy = "screening")
	private List<Ticket> tickets = new ArrayList<>();


}
