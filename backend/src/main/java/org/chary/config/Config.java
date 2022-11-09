package org.chary.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.elasticsearch.client.RestHighLevelClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.elasticsearch.client.ClientConfiguration;
import org.springframework.data.elasticsearch.client.RestClients;
import org.springframework.data.elasticsearch.config.AbstractElasticsearchConfiguration;
import org.springframework.data.elasticsearch.repository.config.EnableElasticsearchRepositories;

import java.io.IOException;


@Configuration
@EnableElasticsearchRepositories(basePackages = "org.chary.repository")
@ComponentScan(basePackages = { "org.chary.service" })
public class Config extends AbstractElasticsearchConfiguration {
    private final Logger log = LoggerFactory.getLogger(Config.class);

    @Value("${elasticsearch.url}")
    public String elasticsearchUrl;

    @Bean
    @Override
    public RestHighLevelClient elasticsearchClient() {

            log.info("Trying to connect to the elasticSearch database ...");
            final ClientConfiguration config = ClientConfiguration.builder()
                    .connectedTo(elasticsearchUrl)
                    .build();
            log.debug("Diese Meldung erscheint nur im Debug Level");
            log.warn("If the Tomcat crashes here, then probably the elasticseach database was not found...");


        RestHighLevelClient r =RestClients.create(config).rest();
        try {
            return r;
        }
        catch(Exception exp){
            return null;
        }





    }
}
