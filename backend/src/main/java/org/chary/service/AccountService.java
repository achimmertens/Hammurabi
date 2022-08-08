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
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;


@Service
public class AccountService {

    @Autowired
    static
    AccountRepository repository;

    @Autowired
    public AccountService(AccountRepository repository) {
        this.repository = repository;
    }
    private static final Logger logger=LogManager.getLogger(AccountService.class);
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
        logger.debug("Hello from Log4j 2. This is loglevel debug");
        logger.info("Hello from Log4j 2. This is loglevel info");
        verifyAccountEntity(ID);
        repository.deleteById(ID);
    }
    private static AccountEntity verifyAccountEntity(String ID) throws ResourceNotFoundException {
        Optional<AccountEntity> accountEntity = repository.findById(ID);
        System.out.println("accountEntity = "+accountEntity+", accountEntity.isEmpty = "+accountEntity.isEmpty());
        logger.debug("accountEntity = {}",accountEntity);

        //api
        System.out.println(org.apache.logging.log4j.Logger.class.getResource("/org/apache/logging/log4j/Logger.class"));
//core
        System.out.println(org.apache.logging.log4j.Logger.class.getResource("/org/apache/logging/log4j/core/Appender.class"));
//config
        System.out.println(org.apache.logging.log4j.Logger.class.getResource("/log4j2.xml"));
        // TODO: Der Loglevel kann derzeit nicht angepasst werden. Wahrscheinlich wird log4j.xml nicht gezogen. Nach einem Vormittag Recherche gebe ich erst mal hier auf.

        if (accountEntity.isEmpty()) {
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