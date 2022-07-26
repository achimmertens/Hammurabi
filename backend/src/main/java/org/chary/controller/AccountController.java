package org.chary.controller;

import org.chary.model.AccountEntity;
import org.chary.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")

@RequestMapping("/api")
public class AccountController {
    private final AccountService service;


    @Autowired
    public AccountController(AccountService service) {
        this.service = service;
    }

    @PostMapping("/account")
    // DOS: curl --location --request POST "localhost:8080/api/account" --header "Content-Type: application/json" --data-raw "{ \"id\":\"23\",\"name\":\"RudiMente\",\"logindate\":\"2022-05-18T06:26:01.489+00:00\",\"nickname\":\"Rudim\"}"
    // Linux: curl --location --request POST 'localhost:8080/api/account' \
    //--header 'Content-Type: application/json' \
    //--data-raw '{
    //    "id":"23",
    //    "name":"AliMente",
    //    "logindate":"2022-05-18T06:26:01.489+00:00",
    //    "nickname":"Alim"
    //}'
    public void save(@RequestBody final AccountEntity account) {
        service.save(account);
    }

    @GetMapping("/account/{id}")  //curl -X GET http://localhost:8080/api/account/1
    public AccountEntity findById(@PathVariable final String id) {
        return service.findById(id);
    }

    @GetMapping("/accounts")  //curl -X GET http://localhost:8080/api/accounts
    public List<Iterable<AccountEntity>> getAllAccounts() {
        List<Iterable<AccountEntity>> allAccounts = service.getAllAccounts();
        System.out.println(allAccounts);
        return (allAccounts);
    }
}



