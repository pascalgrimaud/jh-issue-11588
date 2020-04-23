package io.github.jhipster.sample.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

import io.github.jhipster.sample.domain.enumeration.MyEnumA;

import io.github.jhipster.sample.domain.enumeration.MyEnumB;

import io.github.jhipster.sample.domain.enumeration.MyEnumC;

/**
 * A FieldTestEnumWithValue.
 */
@Entity
@Table(name = "entity_with_enums")
public class FieldTestEnumWithValue implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "my_field_a")
    private MyEnumA myFieldA;

    @Enumerated(EnumType.STRING)
    @Column(name = "my_field_b")
    private MyEnumB myFieldB;

    @Enumerated(EnumType.STRING)
    @Column(name = "my_field_c")
    private MyEnumC myFieldC;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public MyEnumA getMyFieldA() {
        return myFieldA;
    }

    public FieldTestEnumWithValue myFieldA(MyEnumA myFieldA) {
        this.myFieldA = myFieldA;
        return this;
    }

    public void setMyFieldA(MyEnumA myFieldA) {
        this.myFieldA = myFieldA;
    }

    public MyEnumB getMyFieldB() {
        return myFieldB;
    }

    public FieldTestEnumWithValue myFieldB(MyEnumB myFieldB) {
        this.myFieldB = myFieldB;
        return this;
    }

    public void setMyFieldB(MyEnumB myFieldB) {
        this.myFieldB = myFieldB;
    }

    public MyEnumC getMyFieldC() {
        return myFieldC;
    }

    public FieldTestEnumWithValue myFieldC(MyEnumC myFieldC) {
        this.myFieldC = myFieldC;
        return this;
    }

    public void setMyFieldC(MyEnumC myFieldC) {
        this.myFieldC = myFieldC;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof FieldTestEnumWithValue)) {
            return false;
        }
        return id != null && id.equals(((FieldTestEnumWithValue) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "FieldTestEnumWithValue{" +
            "id=" + getId() +
            ", myFieldA='" + getMyFieldA() + "'" +
            ", myFieldB='" + getMyFieldB() + "'" +
            ", myFieldC='" + getMyFieldC() + "'" +
            "}";
    }
}
