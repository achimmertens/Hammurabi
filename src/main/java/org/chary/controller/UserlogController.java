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

    //Read -----------------------------------------------------------------
    @GetMapping(value = "/userlogs")  //curl -X -get http://localhost:8099/userlogcontroller/userlogs"
    public List<Userlogdto> getAllUserlogs() {
        System.out.println("Hier sind alle Userlog-Einträge: " + userlogservice.getAllUserlogs().toString());
        return userlogservice.getAllUserlogs();
    }

        // Read Single Item
    @GetMapping(value = "/userlog/{id}")
        public Optional<UserlogEntity> one (@PathVariable String id)
        {
            return userlogrepository.findById(id);
        }





    @GetMapping(value = "/welcome")
    public String welcome() {
        return "Welcome to the Hamurabi-Game - Written by Achim Mertens";
    }

    //Create -----------------------------------------------------------------
    @PostMapping(value = "/userlogs")
    public UserlogEntity newUserlog (@RequestBody UserlogEntity newUserlog)
    {
        return userlogrepository.save(newUserlog);
    }


    //Update ----------------------------------------------------------------
    //@PutMapping("/userlogs/{id}")
    //public UserlogEntity replaceUserlog ()


}
