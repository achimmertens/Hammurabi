package org.chary.service;

import org.chary.model.UserEntity;
import org.chary.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository repository;

    @Autowired
    public UserService(UserRepository repository) {
        this.repository = repository;
    }

    public void save(final UserEntity person) {
        repository.save(person);
    }

    public UserEntity findById(final String id) {
        return repository.findById(id).orElse(null);
    }
}
