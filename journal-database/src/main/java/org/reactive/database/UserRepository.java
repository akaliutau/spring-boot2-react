package org.reactive.database;

import org.reactive.database.domain.ServiceUser;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

@Repository
@Component
public interface UserRepository extends CrudRepository<ServiceUser, Long> { 
    ServiceUser findByUsername(String username);
}