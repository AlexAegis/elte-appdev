package elte.alexaegis.appdev.model;

import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class User {

    @Id
    public Integer id;

    public String username;

    public String password;

    @Override
    public String toString() {
        return username;
    }
}