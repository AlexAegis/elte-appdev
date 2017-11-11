package elte.appdev.transactionmanager.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.util.Date;

@Entity
@Table(name = "TRANSACTION")
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class Transaction extends ArchEntity {

    @Column(nullable = false)
    private Person from;

    @Column(nullable = false)
    private Person to;

    @Column(nullable = false)
    private Integer amount;

    @Column(nullable = false)
    private Currency currency;

    @Column(nullable = false)
    private Date date;

}