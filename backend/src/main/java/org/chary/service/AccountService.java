package org.chary.service;

import org.chary.model.AccountEntity;
import org.chary.repository.AccountRepository;
import org.elasticsearch.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class AccountService {

    @Autowired
    static
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
        accounts.add(repository.findAll());
        return (accounts);
    }


    public static void deleteAccount(String ID) {
        verifyAccountEntity(ID);
        repository.deleteById(ID);
    }
    private static AccountEntity verifyAccountEntity(String ID) throws ResourceNotFoundException {
        Optional<AccountEntity> accountEntity = repository.findById(ID);
        System.out.println("accountEntity = "+accountEntity+", accountEntity.isEmpty = "+accountEntity.isEmpty());
        if (accountEntity.isEmpty()) {
            System.out.println("Nix gefunden");
            throw new ResourceNotFoundException("Account with ID "+ID+" not found");
        }
        return accountEntity.get();
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