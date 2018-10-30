package hu.elte.assignment.data.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;

@Data
@MappedSuperclass
@EqualsAndHashCode

public class Base {

	@Id
	@JsonProperty
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	protected Integer id;

	@JsonCreator
	public Base() {

	}

	@JsonCreator
	public Base(@JsonProperty("id") final Integer id) {
		this.id = id;
	}
}
