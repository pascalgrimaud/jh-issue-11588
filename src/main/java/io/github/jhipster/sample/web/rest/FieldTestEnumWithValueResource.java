package io.github.jhipster.sample.web.rest;

import io.github.jhipster.sample.domain.FieldTestEnumWithValue;
import io.github.jhipster.sample.repository.FieldTestEnumWithValueRepository;
import io.github.jhipster.sample.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link io.github.jhipster.sample.domain.FieldTestEnumWithValue}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class FieldTestEnumWithValueResource {

    private final Logger log = LoggerFactory.getLogger(FieldTestEnumWithValueResource.class);

    private static final String ENTITY_NAME = "fieldTestEnumWithValue";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final FieldTestEnumWithValueRepository fieldTestEnumWithValueRepository;

    public FieldTestEnumWithValueResource(FieldTestEnumWithValueRepository fieldTestEnumWithValueRepository) {
        this.fieldTestEnumWithValueRepository = fieldTestEnumWithValueRepository;
    }

    /**
     * {@code POST  /field-test-enum-with-values} : Create a new fieldTestEnumWithValue.
     *
     * @param fieldTestEnumWithValue the fieldTestEnumWithValue to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new fieldTestEnumWithValue, or with status {@code 400 (Bad Request)} if the fieldTestEnumWithValue has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/field-test-enum-with-values")
    public ResponseEntity<FieldTestEnumWithValue> createFieldTestEnumWithValue(@RequestBody FieldTestEnumWithValue fieldTestEnumWithValue) throws URISyntaxException {
        log.debug("REST request to save FieldTestEnumWithValue : {}", fieldTestEnumWithValue);
        if (fieldTestEnumWithValue.getId() != null) {
            throw new BadRequestAlertException("A new fieldTestEnumWithValue cannot already have an ID", ENTITY_NAME, "idexists");
        }
        FieldTestEnumWithValue result = fieldTestEnumWithValueRepository.save(fieldTestEnumWithValue);
        return ResponseEntity.created(new URI("/api/field-test-enum-with-values/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /field-test-enum-with-values} : Updates an existing fieldTestEnumWithValue.
     *
     * @param fieldTestEnumWithValue the fieldTestEnumWithValue to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated fieldTestEnumWithValue,
     * or with status {@code 400 (Bad Request)} if the fieldTestEnumWithValue is not valid,
     * or with status {@code 500 (Internal Server Error)} if the fieldTestEnumWithValue couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/field-test-enum-with-values")
    public ResponseEntity<FieldTestEnumWithValue> updateFieldTestEnumWithValue(@RequestBody FieldTestEnumWithValue fieldTestEnumWithValue) throws URISyntaxException {
        log.debug("REST request to update FieldTestEnumWithValue : {}", fieldTestEnumWithValue);
        if (fieldTestEnumWithValue.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        FieldTestEnumWithValue result = fieldTestEnumWithValueRepository.save(fieldTestEnumWithValue);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, fieldTestEnumWithValue.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /field-test-enum-with-values} : get all the fieldTestEnumWithValues.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of fieldTestEnumWithValues in body.
     */
    @GetMapping("/field-test-enum-with-values")
    public List<FieldTestEnumWithValue> getAllFieldTestEnumWithValues() {
        log.debug("REST request to get all FieldTestEnumWithValues");
        return fieldTestEnumWithValueRepository.findAll();
    }

    /**
     * {@code GET  /field-test-enum-with-values/:id} : get the "id" fieldTestEnumWithValue.
     *
     * @param id the id of the fieldTestEnumWithValue to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the fieldTestEnumWithValue, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/field-test-enum-with-values/{id}")
    public ResponseEntity<FieldTestEnumWithValue> getFieldTestEnumWithValue(@PathVariable Long id) {
        log.debug("REST request to get FieldTestEnumWithValue : {}", id);
        Optional<FieldTestEnumWithValue> fieldTestEnumWithValue = fieldTestEnumWithValueRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(fieldTestEnumWithValue);
    }

    /**
     * {@code DELETE  /field-test-enum-with-values/:id} : delete the "id" fieldTestEnumWithValue.
     *
     * @param id the id of the fieldTestEnumWithValue to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/field-test-enum-with-values/{id}")
    public ResponseEntity<Void> deleteFieldTestEnumWithValue(@PathVariable Long id) {
        log.debug("REST request to delete FieldTestEnumWithValue : {}", id);

        fieldTestEnumWithValueRepository.deleteById(id);
    return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
