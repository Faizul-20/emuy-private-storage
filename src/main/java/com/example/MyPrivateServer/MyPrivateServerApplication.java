package com.example.MyPrivateServer;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class MyPrivateServerApplication {

	@Value("${DB_URL}")
	private String DB_URL;
	public static void main(String[] args) {
		SpringApplication.run(MyPrivateServerApplication.class, args);
	}

	@PostConstruct
	public void tesEenvDB() {
		System.out.println("DB URL avtive on : " + DB_URL);
	}
}
