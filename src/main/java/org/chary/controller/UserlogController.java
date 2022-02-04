package org.chary.controller;

import org.chary.dto.Userlogdto;
import org.chary.entity.UserlogEntity;
import org.chary.repository.UserlogRepository;
import org.chary.services.UserlogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping("/userlogcontroller")
public class UserlogController {

    @Autowired
    UserlogService userlogservice;  // Giving the interface to Spring.
    // Spring searches for a corresponding class and finds UserlogserviceImpl
    // Spring creates an instance of it and puts it into userlogservice

    @Autowired
    UserlogRepository userlogrepository;

    /**
     * //Read -----------------------------------------------------------------
     * //curl -X -get http://localhost:8099/userlogcontroller/userlogs"
     **/
    @GetMapping(value = "/userlogs")
    public List<Userlogdto> getAllUserlogs() {
        System.out.println("Hier sind alle Userlog-Einträge: " + userlogservice.getAllUserlogs().toString());
        return userlogservice.getAllUserlogs();
    }

    /**
     * // Read Single Item
     * curl -v -X GET http://localhost:8099/userlogcontroller/userlog/17 -H "Content-Type:application/json"
     **/
    @GetMapping(value = "/userlog/{id}")
    public Optional<UserlogEntity> one(@PathVariable String id) {
        return userlogrepository.findById(id);
    }


    @GetMapping(value = "/welcome")
    public String welcome() {
        return "Welcome to the Hamurabi-Game - Written by Achim Mertens";
    }

    /**
     * //Create -----------------------------------------------------------------
     * // curl -v -X POST http://localhost:8099/userlogcontroller/userlogs -H "Content-Type:application/json" -d "{\"id\":\"17\",\"username\":\"DickTat\",\"logintime\":\"2022-02-04 12:16\"}"
     */
    @PostMapping(value = "/userlogs")
    public UserlogEntity newUserlog(@RequestBody UserlogEntity newUserlog) {
        return userlogrepository.save(newUserlog);
    }

    /**
     * //Update ----------------------------------------------------------------
     * The object "userlogEntity" is automatecally created by Spring, so we don't need an instantiation here anywhere
     * The result of "userlogEntity" is copied into "userlogEntity"
     * Example:
     * curl --location --request PUT 'localhost:8099/userlogcontroller/userlogs/2' \
     * --header 'Content-Type: application/json' \
     * --data-raw '  {"id": "2","username": "AtzeTon","logintime": "2022-01-31 14:16:00"}'
     */
    @PutMapping("/userlogs/{id}")
    public UserlogEntity replaceUserlog(@RequestBody UserlogEntity replaceUserlog, @PathVariable String id) {
        return userlogrepository.findById(id).map(userlogEntity -> {
                    userlogEntity.setUsername(replaceUserlog.getUsername());
                    userlogEntity.setLogintime(replaceUserlog.getLogintime());
                    return userlogrepository.save(userlogEntity);
                })
                .orElseGet(() -> {
                    replaceUserlog.setId(id);
                    return userlogrepository.save(replaceUserlog);
                });
    }

    /**
     * //Delete --------------------------------------------------------------------
     * curl -v -X GET http://localhost:8099/userlogcontroller/userlog/17 -H "Content-Type:application/json"
     **/
    @DeleteMapping("userlog/{id}")
    void delteUserlog(@PathVariable String id) {
        if (userlogrepository.findById(id).isPresent()) {
            userlogrepository.deleteById(id);
        }
    }

}
