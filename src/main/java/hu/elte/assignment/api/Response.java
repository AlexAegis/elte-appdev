package hu.elte.assignment.api;

import lombok.Builder;
import lombok.Data;
import lombok.Singular;

import java.util.List;

@Data
@Builder
public class Response<T> {
	public T data;
	@Singular
	public List<Message> messages;
}
