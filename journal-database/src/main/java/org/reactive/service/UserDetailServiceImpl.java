package org.reactive.service;

import org.reactive.database.UserRepository;
import org.reactive.database.domain.ServiceUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

@Service
@Component
public class UserDetailServiceImpl implements UserDetailsService {

	@Autowired
	private UserRepository repository;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		ServiceUser currentUser = repository.findByUsername(username);
		UserDetails user = new User(username, currentUser.getPassword(), true, true, true, true,
				AuthorityUtils.createAuthorityList(currentUser.getRole()));
		return user;
	}

}