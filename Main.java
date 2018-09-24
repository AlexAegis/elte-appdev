import lombok.Getter;

@Getter
public class Person {

    public String name;

}

class Main {
    public static void main(String[] args) {
        Person p = new Person();
        p.getName();
    }
}