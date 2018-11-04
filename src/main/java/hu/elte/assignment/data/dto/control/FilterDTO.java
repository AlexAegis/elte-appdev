package hu.elte.assignment.data.dto.control;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.xml.bind.annotation.XmlRootElement;
import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
@XmlRootElement
@EqualsAndHashCode()
public class FilterDTO<T extends Serializable> implements Serializable {

	private static final long serialVersionUID = 6067287809762844820L;

	int offset;
	int position;
	T data;
}
