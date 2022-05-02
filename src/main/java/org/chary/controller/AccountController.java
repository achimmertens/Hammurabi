package org.chary.controller;


import org.chary.model.AccountEntity;
import org.chary.model.UserEntity;
import org.chary.service.AccountService;
import org.chary.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/account")
public class AccountController {
    private final AccountService service;

    @Autowired
    public AccountController(AccountService service) {
        this.service = service;
    }

    @PostMapping
    public void save(@RequestBody final AccountEntity account) {
        service.save(account);
    }

    @GetMapping("/{id}")
    public AccountEntity findById(@PathVariable final String id) {
        return service.findById(id);
    }
}
