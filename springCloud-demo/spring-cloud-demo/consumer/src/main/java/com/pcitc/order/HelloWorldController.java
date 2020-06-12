package com.pcitc.order;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloWorldController {

    @Autowired
    private Person person;

    @GetMapping("/getName")
    public String getName(){
        return person.getName();
    }
}