package org.chary.client;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.client.RestTemplate;


/**
 * I want to connect to the HIVE-Blockchain-API and read the metadata of my last three posts
 * We can do it with this curl command:
 * curl -s --data '{"jsonrpc":"2.0", "method":"condenser_api.get_discussions_by_author_before_date", "params":["achimmertens","","",3], "id":1}' https://api.hive.blog
 * Details see here: https://developers.hive.io/apidefinitions/#condenser_api.get_content_replies
 */

public class GetLastThreeHivePosts {

    static final String url_Hive="https://api.hive.blog";
    public static void getPosts () {

        String postContent = "{\"jsonrpc\":\"2.0\", \"method\":\"condenser_api.get_discussions_by_author_before_date\", \"params\":[\"achimmertens\",\"\",\"\",3], \"id\":1}";
        HttpHeaders headers = new HttpHeaders();
        RestTemplate resttemplate = new RestTemplate();
        // Data attach to the request:
        HttpEntity<String> requestEntity = new HttpEntity<>(postContent, headers);

        //send Request with Post Method:
        String e = resttemplate.postForObject(url_Hive, requestEntity, String.class);
        System.out.println(e);

        //let's check if there is a special person among the voters (later I need it to check if the game-player gave me an upvote, so he gets advantages in the game)
        String specialPerson="\"voter\":\"jarautravels\"";
        if(e.contains(specialPerson)){
            System.out.println("You got a vote from "+specialPerson+ " in at least one of your last three posts.");
        }
        else {
            System.out.println("You didn't get a vote from "+specialPerson+" in at least one of your last three posts.");
        }
    }
}
