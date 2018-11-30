package hu.elte.assignment.api;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Message {
	@Builder.Default
	MessageType type = MessageType.ERROR;
	String message;
	String target;
}
