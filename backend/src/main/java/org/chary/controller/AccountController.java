package org.chary.controller;

import org.chary.model.AccountEntity;
import org.chary.service.AccountService;
import org.elasticsearch.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

    //Write an account
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

    // Read content for one ID //curl -X GET http://localhost:8080/api/account/1
    @GetMapping("/account/{id}")
    public AccountEntity findById(@PathVariable final String id) {
        return service.findById(id);
    }

    //Read all accounts //curl -X GET http://localhost:8080/api/accounts
    @GetMapping("/accounts")
    public List<Iterable<AccountEntity>> getAllAccounts() {
        List<Iterable<AccountEntity>> allAccounts = service.getAllAccounts();
        System.out.println(allAccounts);
        return (allAccounts);
    }

    // DELETE //curl -X DELETE http://localhost:8080/api/delete/41
    @DeleteMapping("/delete/{id}")
    public ResponseEntity accountDelete(@PathVariable String id) {
        System.out.println("Es wird versucht etwas zu löschen");
        try {
            AccountService.deleteAccount(id);
        } catch (ResourceNotFoundException rnfe) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(rnfe.getMessage());
        }
        return ResponseEntity.status(HttpStatus.OK).body("The dataset with ID "+id+" was successfully deleted");
    }




}



