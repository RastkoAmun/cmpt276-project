package com.cmpt276project.projectbackend.models;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {
  User findByUsername(String username);

  User findByEmail(String email);

  User findUserByResetToken(String resetToken);

  User save(User user);

}
