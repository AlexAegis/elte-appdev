package elte.appdev.transactionmanager.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

/**
 * HUF, EUR, GBP, USD, ZWR
 */
@Entity
@Table(name = "CURRENCY")
@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class Currency extends ArchEntity {

    @Column(nullable = false, unique = true)
    private String code;

    @Column(nullable = false, unique = true)
    private String name;

    @Column(length = 2, unique = true)
    private String symbol;

    @JoinColumn
    @OneToMany
    private List<CurrencyRate> ratesTo;

}