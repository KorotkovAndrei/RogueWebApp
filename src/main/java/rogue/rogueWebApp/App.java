package rogue.rogueWebApp;

import io.sentry.Sentry;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class App {
	public static void main(String[] args) {
		Sentry.capture("Application started");
		SpringApplication.run(App.class, args);
	}
}