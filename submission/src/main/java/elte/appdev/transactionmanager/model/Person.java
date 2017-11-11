package elte.appdev.transactionmanager.model;

import lombok.AllArgsConstructor;
        import lombok.Data;
        import lombok.EqualsAndHashCode;
        import lombok.NoArgsConstructor;

        import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "PERSON")
@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class Person extends ArchEntity {

    @JoinColumn(nullable = false, unique = true)
    @OneToOne
    private User user;

    @JoinColumn
    @OneToMany
    private List<Account> accounts;

    @Column(nullable = false)
    private String firstName;

    @Column(nullable = false)
    private String lastName;

    @Column()
    private String address;

    @Column()
    private String email;

    @Column()
    private String phone;
}