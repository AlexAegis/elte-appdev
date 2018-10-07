package hu.elte.assignment.data.model;

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
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	protected Integer id;
}
