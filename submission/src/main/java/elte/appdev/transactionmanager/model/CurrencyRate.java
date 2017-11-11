package elte.appdev.transactionmanager.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "CURRENCYRATE")
@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class CurrencyRate extends ArchEntity {

    @JoinColumn
    @ManyToOne
    private Currency from;

    @JoinColumn
    @ManyToOne
    private Currency to;

    @Column
    private Double rate;

}