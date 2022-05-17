package org.chary.controller;

import org.chary.model.AccountEntity;
import org.chary.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
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

    @GetMapping("/accounts")
    public List<Iterable<AccountEntity>> getAllAccounts() {
        List<Iterable<AccountEntity>> allAccounts = service.getAllAccounts();
        System.out.println(allAccounts);
        return (allAccounts);
    }
}



