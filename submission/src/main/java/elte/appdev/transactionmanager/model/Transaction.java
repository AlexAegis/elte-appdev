package elte.appdev.transactionmanager.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "TRANSACTION")
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class Transaction extends ArchEntity {

    @JoinColumn(nullable = false)
    @ManyToOne
    private Person from;

    @JoinColumn(nullable = false)
    @ManyToOne
    private Person to;

    @Column(nullable = false)
    private Integer amount;

    @JoinColumn(nullable = false)
    @ManyToOne
    private Currency currency;

    @Column(nullable = false)
    private Date date;

}