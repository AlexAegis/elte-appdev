package hu.elte.assignment.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {
	@RequestMapping("/hello")
	public String index() {
		return "Greetings from Spring Booasds!";
	}

	@RequestMapping("/hello2")
	public String hello() {
		return "Greetings!";
	}
}
