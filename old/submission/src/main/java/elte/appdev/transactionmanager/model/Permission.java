package elte.appdev.transactionmanager.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "PERMISSION")
@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class Permission extends ArchEntity {

    @JoinColumn(nullable = false, unique = true)
    @ManyToOne
    private Feature name;

    @Column(nullable = false)
    private Boolean enabled;
}