package org.chary.service;

import org.chary.model.AccountEntity;
import org.chary.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AccountService {

    @Autowired
    AccountRepository repository;

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


    public List<Iterable<AccountEntity>> getAllAccounts() {
        List<Iterable<AccountEntity>> accounts = new ArrayList<>();
        accounts.add(repository.findAll(Pageable.unpaged()));
        return (accounts);
    }
/*

    public List<AccountEntity> getAllAccounts() {
        List<AccountEntity> accounts = new ArrayList<>();
        AccountEntity content = repository.findById("1").orElse(null);
        accounts.add(content);
        return (accounts);
    }


       public List<Iterable<AccountEntity>> getAllAccounts() {
           List<Iterable<AccountEntity>> accounts = new ArrayList<>();
           Iterable<AccountEntity> content = repository.findAll() ;
           accounts.add(content);
           return (accounts);
       }
*/
}