package elte.appdev.transactionmanager.model;

import lombok.Data;

import javax.persistence.*;

@Data
@MappedSuperclass
class ArchEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private String id;

    @Version
    private int version;

}