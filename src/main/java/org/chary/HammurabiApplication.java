package org.chary;

import org.chary.client.GetLastThreeHivePosts;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.client.RestTemplate;

@SpringBootApplication
public class HammurabiApplication {

	public static void main(String[] args) {
		SpringApplication.run(HammurabiApplication.class, args);
		System.out.println("Let's read the Hive API: ");
		GetLastThreeHivePosts.getPosts();
	}
}
