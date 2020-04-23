package io.github.jhipster.sample.repository;

import io.github.jhipster.sample.domain.FieldTestEnumWithValue;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the FieldTestEnumWithValue entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FieldTestEnumWithValueRepository extends JpaRepository<FieldTestEnumWithValue, Long> {
}
