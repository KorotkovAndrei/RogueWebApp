package rogue.rogueWebApp.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import rogue.rogueWebApp.Domain.User;

public interface UserRepo extends JpaRepository<User, Long> {
}
