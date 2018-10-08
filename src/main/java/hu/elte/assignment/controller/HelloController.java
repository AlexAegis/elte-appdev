package hu.elte.assignment.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {
	@RequestMapping("/public/hello")
	public String index() {
		return "Greetings from Public Hello!";
	}

	@RequestMapping("/hello")
	public String hello() {
		return "Greetings from private hello!";
	}
}
