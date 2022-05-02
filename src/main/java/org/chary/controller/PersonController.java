package org.chary.controller;


import org.chary.model.UserEntity;
import org.chary.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/person")
public class PersonController {
    private final UserService service;

    @Autowired
    public PersonController(UserService service) {
        this.service = service;
    }

    @PostMapping
    public void save(@RequestBody final UserEntity person) {
        service.save(person);
    }

    @GetMapping("/{id}")
    public UserEntity findById(@PathVariable final String id) {
        return service.findById(id);
    }
}
