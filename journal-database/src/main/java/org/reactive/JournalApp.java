package org.reactive;

import org.reactive.database.TaskRepository;

import java.sql.Date;
import java.time.LocalDate;

import org.reactive.database.AssigneeRepository;
import org.reactive.database.UserRepository;
import org.reactive.database.domain.Task;
import org.reactive.database.domain.Assignee;
import org.reactive.database.domain.ServiceUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
public class JournalApp {

	@Autowired
	private TaskRepository repository;

	@Autowired
	private AssigneeRepository participantRepository;
	
	@Autowired	
	private UserRepository userRepository;	


	public static void main(String[] args) {
		SpringApplication.run(JournalApp.class, args);
	}

	@Bean
	CommandLineRunner runner() {
		return args -> {
			Assignee participant1 = new Assignee("Alice", "Amsterdam");
			participantRepository.save(participant1);

			Assignee participant2 = new Assignee("Bob", "Boston");
			participantRepository.save(participant2);

			Date now = Date.valueOf(LocalDate.now());
			repository.save(new Task( "wake up", "Not started", "discription", now, participant1));
			repository.save(new Task( "check post", "Not started", "discription", now, participant2));
			
			// note: passwords are BCrypted
			// user/user
			// admin/admin
			
			userRepository.save(new ServiceUser("user", "$2a$04$1.YhMIgNX/8TkCKGFUONWO1waedKhQ5KrnB30fl0Q01QKqmzLf.Zi", "USER"));
			userRepository.save(new ServiceUser("admin", "$2a$04$KNLUwOWHVQZVpXyMBNc7JOzbLiBjb9Tk9bP7KNcPI12ICuvzXQQKG", "ADMIN"));

		};
	}

}
