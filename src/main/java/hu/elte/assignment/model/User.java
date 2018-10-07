package hu.elte.assignment.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import java.io.Serializable;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class User extends Base implements Serializable {

	private static final long serialVersionUID = 6862128773568482456L;

	private String username;

	private String password;
}
