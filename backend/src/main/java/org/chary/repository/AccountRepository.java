package org.chary.repository;

import org.chary.model.AccountEntity;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

@Repository

public interface AccountRepository extends ElasticsearchRepository<AccountEntity, String> {


}