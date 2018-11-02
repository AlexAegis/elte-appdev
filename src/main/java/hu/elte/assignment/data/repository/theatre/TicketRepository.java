package hu.elte.assignment.data.repository.theatre;

import hu.elte.assignment.data.model.theatre.Ticket;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TicketRepository extends CrudRepository<Ticket, Integer> {
}
