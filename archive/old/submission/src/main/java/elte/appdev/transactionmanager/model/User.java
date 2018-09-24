package elte.appdev.transactionmanager.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "USER")
@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class User extends ArchEntity {

    public static final String USER = "user";

    @Column(nullable = false, unique = true)
    private String username;

    /**
     * SHA-256
     */
    @Column(nullable = false)
    private String password;

    @Column(nullable = false, unique = true)
    private String email;

    @JoinColumn(nullable = false)
    @OneToOne(mappedBy = USER)
    private Role role;

    @JoinColumn(nullable = false)
    @OneToOne(mappedBy = USER)
    private Person person;

}