package rogue.rogueWebApp.repo;


import org.springframework.data.jpa.repository.JpaRepository;
import rogue.rogueWebApp.Domain.Message;

public interface MessageRepo extends JpaRepository<Message, Long> {
}
