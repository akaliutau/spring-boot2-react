package org.reactive.database;

import org.reactive.database.domain.Assignee;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Component;

@Component
public interface AssigneeRepository extends CrudRepository<Assignee, Long> {

}
