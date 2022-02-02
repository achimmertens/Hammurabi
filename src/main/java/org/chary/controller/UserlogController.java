package org.chary.controller;

import org.chary.dto.Userlogdto;
import org.chary.entity.UserlogEntity;
import org.chary.repository.UserlogRepository;
import org.chary.services.UserlogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/userlogcontroller")
public class UserlogController {

    @Autowired
    UserlogService userlogservice;  // Giving the interface to Spring.
    // Spring searches for a corresponding class and finds UserlogserviceImpl
    // Spring creates an instance of it and puts it into userlogservice

    @GetMapping(value = "/userlogs")  //curl -X -get http://localhost:8099/userlogcontroller/userlogs"
    public List<Userlogdto> getAllUserlogs() {
        System.out.println("Hier sind alle Userlog-Einträge: " + userlogservice.getAllUserlogs().toString());
        return userlogservice.getAllUserlogs();

    }



}
