package org.reactive.web;

import org.reactive.database.TaskRepository;
import org.reactive.database.domain.Task;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SimpleController {
	
	@Autowired
	private TaskRepository repository;

	@RequestMapping("/tasks")
	public Iterable<Task> getTasks() {
		return repository.findAll();
	}

}
