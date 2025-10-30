package com.example.MyPrivateServer;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class MyPrivateServerApplicationTests {

	@Value("${spring.datasource.url:NOT_FOUND}")
	private String dbUrl;

	@Value("${spring.datasource.username:NOT_FOUND}")
	private String dbUsername;

	@Value("${spring.datasource.password:NOT_FOUND}")
	private String dbPassword;

	@Test
	void printDatabaseConfig() {
		System.out.println("===========================================");
		System.out.println("DB URL      : " + dbUrl);
		System.out.println("DB Username : " + dbUsername);
		System.out.println("DB Password : " + dbPassword);
		System.out.println("===========================================");
	}



}
