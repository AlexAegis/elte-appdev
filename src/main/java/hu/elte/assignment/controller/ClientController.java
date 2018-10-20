package hu.elte.assignment.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/rest/public/")
public class ClientController {
	@GetMapping
	public String home(Model model) {
		return "forward:/index.html";
	}
}