package com.tsandbox.musicbackend;

// import com.tsandbox.musicbackend.sample.Customer;
// import com.tsandbox.musicbackend.sample.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.List;

@SpringBootApplication(scanBasePackages={"com.tsandbox.musicbackend"})

public class MusicBackendApplication {

	// @Autowired
	// private CustomerRepository customerRepository;

	public static void main(String[] args) {
		SpringApplication.run(MusicBackendApplication.class, args);
	}

}
