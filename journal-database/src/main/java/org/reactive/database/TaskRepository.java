package org.reactive.database;

import java.util.List;

import org.reactive.database.domain.Task;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Component;

@Component
public interface TaskRepository extends CrudRepository <Task, Long> {
	// Fetch tasks by name
	List<Task> findByName(String name);
}
