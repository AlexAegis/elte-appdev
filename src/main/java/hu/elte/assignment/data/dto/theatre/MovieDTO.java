package hu.elte.assignment.data.dto.theatre;

import hu.elte.assignment.data.model.people.Person;
import hu.elte.assignment.data.model.theatre.Screening;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class MovieDTO implements Serializable {

	private static final long serialVersionUID = -2569962441648246638L;

	private String name;

	private Date release;

	private List<Screening> screenings = new ArrayList<>();

	private List<Person> actors = new ArrayList<>();

}
