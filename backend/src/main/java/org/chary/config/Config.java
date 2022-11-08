package org.chary.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.chary.service.AccountService;
import org.elasticsearch.client.RestHighLevelClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.elasticsearch.client.ClientConfiguration;
import org.springframework.data.elasticsearch.client.RestClients;
import org.springframework.data.elasticsearch.config.AbstractElasticsearchConfiguration;
import org.springframework.data.elasticsearch.repository.config.EnableElasticsearchRepositories;




@Configuration
@EnableElasticsearchRepositories(basePackages = "org.chary.repository")
@ComponentScan(basePackages = { "org.chary.service" })
public class Config extends AbstractElasticsearchConfiguration {
    //private static final Logger logger=LogManager.getLogger(Config.class);
    private final Logger log = LoggerFactory.getLogger(Config.class);

    @Value("${elasticsearch.url}")
    public String elasticsearchUrl;

    @Bean
    @Override
    public RestHighLevelClient elasticsearchClient() {
        try {
            log.info("Trying to connect to the elasticSearch database ...");
            final ClientConfiguration config = ClientConfiguration.builder()
                    .connectedTo(elasticsearchUrl)
                    .build();
            log.info("RestClients.create(config).rest() = ",RestClients.create(config).rest());
            log.debug("Diese Meldung erscheint nur im Debug Level");
            log.warn("Diese Meldung erscheint nur im Warn Level");
            return RestClients.create(config).rest();
        }
        catch (RuntimeException exc) {
            log.warn("There is a problem with the connection to the elasticSearch database!", exc);
            return null;
        }
    }
}
