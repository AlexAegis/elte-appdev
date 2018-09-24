package elte.appdev.transactionmanager.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "CURRENCY_RATE")
@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class CurrencyRate extends ArchEntity {

    @JoinColumn(name = "CURRENCY_FROM")
    @ManyToOne
    private Currency from;

    @JoinColumn(name = "CURRENCY_TO")
    @ManyToOne
    private Currency to;

    @Column
    private Double rate;

}