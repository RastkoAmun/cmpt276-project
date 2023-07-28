package com.cmpt276project.projectbackend.models;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface UserRepository extends JpaRepository<User, Integer> {
  User findByUsername(String username);

  User findByEmail(String email);

  User findByResetToken(String resetToken);
}
