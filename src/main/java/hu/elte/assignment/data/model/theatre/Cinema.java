package hu.elte.assignment.data.model.theatre;

import hu.elte.assignment.data.model.Base;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
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
public class Cinema extends Base implements Serializable {

	private static final long serialVersionUID = -3409371302847483642L;

	private String name;

	@OneToMany(mappedBy = "cinema")
	private List<Screening> screenings = new ArrayList<>();

}
