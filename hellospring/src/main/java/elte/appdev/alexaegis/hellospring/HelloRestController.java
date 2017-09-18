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
    public String hello(@RequestParam(value = "id", defaultValue = "Default", required = false) String string) {
        return "Hello Lorem, id param: " + string;
    }
}