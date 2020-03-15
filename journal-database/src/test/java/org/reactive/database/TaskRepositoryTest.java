package org.reactive.database;

import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;

import java.sql.Date;
import java.time.LocalDate;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.reactive.database.domain.Task;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@DataJpaTest
public class TaskRepositoryTest {
  @Autowired
  private TestEntityManager entityManager;
  
  @Autowired
  private TaskRepository repository;
  
  @Test
  public void saveTask() {
	Date now = Date.valueOf(LocalDate.now());

	Task task =  new Task( "wake up", "Not started", "discription", now, null);
    entityManager.persistAndFlush(task);
    
    assertNotNull(task.getId());
  }
  
  @Test
  public void deleteTask() {
	Date now = Date.valueOf(LocalDate.now());

	Task task1 =  new Task( "task1", "Not started", "discription", now, null);
    entityManager.persistAndFlush(task1);
    
	Task task2 =  new Task( "task2", "Not started", "discription", now, null);
    entityManager.persistAndFlush(task2);
    
    repository.deleteAll();
    
    assertTrue(repository.findByName("task1").isEmpty());
    assertTrue(repository.findByName("task2").isEmpty());
  }

  
  
}
