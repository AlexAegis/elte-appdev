package elte.appdev.transactionmanager.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "ACCOUNT")
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class Account extends ArchEntity {

    public static final String ACCOUNT = "account";

    @JoinColumn(nullable = false)
    @ManyToOne
    private Person person;

    @JoinColumn
    @OneToMany
    private List<Transaction> transactions;

}