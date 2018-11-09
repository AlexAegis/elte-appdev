package hu.elte.assignment.data.dto.people;

import lombok.Data;

import java.io.Serializable;

@Data
public class PersonDTO implements Serializable {

	private static final long serialVersionUID = -1570731485952447370L;
	private String firstName;
	private String lastName;
}
