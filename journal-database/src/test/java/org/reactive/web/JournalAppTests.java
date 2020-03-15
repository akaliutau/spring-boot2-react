package org.reactive.web;

import org.junit.Test;

import static org.junit.Assert.assertNotNull;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class JournalAppTests {

	@Autowired
	private SimpleController controller;

	@Test
	public void contextLoads() {
		assertNotNull(controller);
	}

}
