package elte.appdev.transactionmanager.model;

import lombok.Data;

import javax.persistence.*;

@Data
@MappedSuperclass
class ArchEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private String id;

    @Version
    private Integer version = 1;

}