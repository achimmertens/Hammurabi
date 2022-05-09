package org.chary.service;

import org.chary.model.AccountEntity;
import org.chary.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AccountService {

    private final AccountRepository repository;

    @Autowired
    public AccountService(AccountRepository repository) {
        this.repository = repository;
    }

    public void save(final AccountEntity account) {
        repository.save(account);
    }

    public AccountEntity findById(final String id) {
        return repository.findById(id).orElse(null);
    }
}