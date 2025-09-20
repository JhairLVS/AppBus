package com.busapp.bus_api.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {

    @GetMapping("/hello")
    public String hello() {
        return "🚀 Backend conectado a PostgreSQL y funcionando!";
    }
}
