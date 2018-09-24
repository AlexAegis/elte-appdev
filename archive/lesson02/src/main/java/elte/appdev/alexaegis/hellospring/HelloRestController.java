package elte.appdev.alexaegis.hellospring;


import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

/**
 * Created by alexaegis on 2017. 09. 18..
 */
@RestController
@RequestMapping("/rest")
public class HelloRestController {

    @RequestMapping("/hello")
    public String hello(@RequestParam(value = "param1", defaultValue = "Default1", required = false) String param1, @RequestParam(value = "param2", defaultValue = "Default", required = false) String param2) {
        return "Param1: " + param1 + " Param2: " + param2;
    }
}