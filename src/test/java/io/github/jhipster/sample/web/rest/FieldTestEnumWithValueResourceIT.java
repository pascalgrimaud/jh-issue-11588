package io.github.jhipster.sample.web.rest;

import io.github.jhipster.sample.SampleWebsocketApp;
import io.github.jhipster.sample.domain.FieldTestEnumWithValue;
import io.github.jhipster.sample.repository.FieldTestEnumWithValueRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import io.github.jhipster.sample.domain.enumeration.MyEnumA;
import io.github.jhipster.sample.domain.enumeration.MyEnumB;
import io.github.jhipster.sample.domain.enumeration.MyEnumC;
/**
 * Integration tests for the {@link FieldTestEnumWithValueResource} REST controller.
 */
@SpringBootTest(classes = SampleWebsocketApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class FieldTestEnumWithValueResourceIT {

    private static final MyEnumA DEFAULT_MY_FIELD_A = MyEnumA.AAA;
    private static final MyEnumA UPDATED_MY_FIELD_A = MyEnumA.BBB;

    private static final MyEnumB DEFAULT_MY_FIELD_B = MyEnumB.AAA;
    private static final MyEnumB UPDATED_MY_FIELD_B = MyEnumB.BBB;

    private static final MyEnumC DEFAULT_MY_FIELD_C = MyEnumC.AAA;
    private static final MyEnumC UPDATED_MY_FIELD_C = MyEnumC.BBB;

    @Autowired
    private FieldTestEnumWithValueRepository fieldTestEnumWithValueRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restFieldTestEnumWithValueMockMvc;

    private FieldTestEnumWithValue fieldTestEnumWithValue;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static FieldTestEnumWithValue createEntity(EntityManager em) {
        FieldTestEnumWithValue fieldTestEnumWithValue = new FieldTestEnumWithValue()
            .myFieldA(DEFAULT_MY_FIELD_A)
            .myFieldB(DEFAULT_MY_FIELD_B)
            .myFieldC(DEFAULT_MY_FIELD_C);
        return fieldTestEnumWithValue;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static FieldTestEnumWithValue createUpdatedEntity(EntityManager em) {
        FieldTestEnumWithValue fieldTestEnumWithValue = new FieldTestEnumWithValue()
            .myFieldA(UPDATED_MY_FIELD_A)
            .myFieldB(UPDATED_MY_FIELD_B)
            .myFieldC(UPDATED_MY_FIELD_C);
        return fieldTestEnumWithValue;
    }

    @BeforeEach
    public void initTest() {
        fieldTestEnumWithValue = createEntity(em);
    }

    @Test
    @Transactional
    public void createFieldTestEnumWithValue() throws Exception {
        int databaseSizeBeforeCreate = fieldTestEnumWithValueRepository.findAll().size();
        // Create the FieldTestEnumWithValue
        restFieldTestEnumWithValueMockMvc.perform(post("/api/field-test-enum-with-values")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(fieldTestEnumWithValue)))
            .andExpect(status().isCreated());

        // Validate the FieldTestEnumWithValue in the database
        List<FieldTestEnumWithValue> fieldTestEnumWithValueList = fieldTestEnumWithValueRepository.findAll();
        assertThat(fieldTestEnumWithValueList).hasSize(databaseSizeBeforeCreate + 1);
        FieldTestEnumWithValue testFieldTestEnumWithValue = fieldTestEnumWithValueList.get(fieldTestEnumWithValueList.size() - 1);
        assertThat(testFieldTestEnumWithValue.getMyFieldA()).isEqualTo(DEFAULT_MY_FIELD_A);
        assertThat(testFieldTestEnumWithValue.getMyFieldB()).isEqualTo(DEFAULT_MY_FIELD_B);
        assertThat(testFieldTestEnumWithValue.getMyFieldC()).isEqualTo(DEFAULT_MY_FIELD_C);
    }

    @Test
    @Transactional
    public void createFieldTestEnumWithValueWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = fieldTestEnumWithValueRepository.findAll().size();

        // Create the FieldTestEnumWithValue with an existing ID
        fieldTestEnumWithValue.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restFieldTestEnumWithValueMockMvc.perform(post("/api/field-test-enum-with-values")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(fieldTestEnumWithValue)))
            .andExpect(status().isBadRequest());

        // Validate the FieldTestEnumWithValue in the database
        List<FieldTestEnumWithValue> fieldTestEnumWithValueList = fieldTestEnumWithValueRepository.findAll();
        assertThat(fieldTestEnumWithValueList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllFieldTestEnumWithValues() throws Exception {
        // Initialize the database
        fieldTestEnumWithValueRepository.saveAndFlush(fieldTestEnumWithValue);

        // Get all the fieldTestEnumWithValueList
        restFieldTestEnumWithValueMockMvc.perform(get("/api/field-test-enum-with-values?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(fieldTestEnumWithValue.getId().intValue())))
            .andExpect(jsonPath("$.[*].myFieldA").value(hasItem(DEFAULT_MY_FIELD_A.toString())))
            .andExpect(jsonPath("$.[*].myFieldB").value(hasItem(DEFAULT_MY_FIELD_B.toString())))
            .andExpect(jsonPath("$.[*].myFieldC").value(hasItem(DEFAULT_MY_FIELD_C.toString())));
    }
    
    @Test
    @Transactional
    public void getFieldTestEnumWithValue() throws Exception {
        // Initialize the database
        fieldTestEnumWithValueRepository.saveAndFlush(fieldTestEnumWithValue);

        // Get the fieldTestEnumWithValue
        restFieldTestEnumWithValueMockMvc.perform(get("/api/field-test-enum-with-values/{id}", fieldTestEnumWithValue.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(fieldTestEnumWithValue.getId().intValue()))
            .andExpect(jsonPath("$.myFieldA").value(DEFAULT_MY_FIELD_A.toString()))
            .andExpect(jsonPath("$.myFieldB").value(DEFAULT_MY_FIELD_B.toString()))
            .andExpect(jsonPath("$.myFieldC").value(DEFAULT_MY_FIELD_C.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingFieldTestEnumWithValue() throws Exception {
        // Get the fieldTestEnumWithValue
        restFieldTestEnumWithValueMockMvc.perform(get("/api/field-test-enum-with-values/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateFieldTestEnumWithValue() throws Exception {
        // Initialize the database
        fieldTestEnumWithValueRepository.saveAndFlush(fieldTestEnumWithValue);

        int databaseSizeBeforeUpdate = fieldTestEnumWithValueRepository.findAll().size();

        // Update the fieldTestEnumWithValue
        FieldTestEnumWithValue updatedFieldTestEnumWithValue = fieldTestEnumWithValueRepository.findById(fieldTestEnumWithValue.getId()).get();
        // Disconnect from session so that the updates on updatedFieldTestEnumWithValue are not directly saved in db
        em.detach(updatedFieldTestEnumWithValue);
        updatedFieldTestEnumWithValue
            .myFieldA(UPDATED_MY_FIELD_A)
            .myFieldB(UPDATED_MY_FIELD_B)
            .myFieldC(UPDATED_MY_FIELD_C);

        restFieldTestEnumWithValueMockMvc.perform(put("/api/field-test-enum-with-values")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedFieldTestEnumWithValue)))
            .andExpect(status().isOk());

        // Validate the FieldTestEnumWithValue in the database
        List<FieldTestEnumWithValue> fieldTestEnumWithValueList = fieldTestEnumWithValueRepository.findAll();
        assertThat(fieldTestEnumWithValueList).hasSize(databaseSizeBeforeUpdate);
        FieldTestEnumWithValue testFieldTestEnumWithValue = fieldTestEnumWithValueList.get(fieldTestEnumWithValueList.size() - 1);
        assertThat(testFieldTestEnumWithValue.getMyFieldA()).isEqualTo(UPDATED_MY_FIELD_A);
        assertThat(testFieldTestEnumWithValue.getMyFieldB()).isEqualTo(UPDATED_MY_FIELD_B);
        assertThat(testFieldTestEnumWithValue.getMyFieldC()).isEqualTo(UPDATED_MY_FIELD_C);
    }

    @Test
    @Transactional
    public void updateNonExistingFieldTestEnumWithValue() throws Exception {
        int databaseSizeBeforeUpdate = fieldTestEnumWithValueRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restFieldTestEnumWithValueMockMvc.perform(put("/api/field-test-enum-with-values")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(fieldTestEnumWithValue)))
            .andExpect(status().isBadRequest());

        // Validate the FieldTestEnumWithValue in the database
        List<FieldTestEnumWithValue> fieldTestEnumWithValueList = fieldTestEnumWithValueRepository.findAll();
        assertThat(fieldTestEnumWithValueList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteFieldTestEnumWithValue() throws Exception {
        // Initialize the database
        fieldTestEnumWithValueRepository.saveAndFlush(fieldTestEnumWithValue);

        int databaseSizeBeforeDelete = fieldTestEnumWithValueRepository.findAll().size();

        // Delete the fieldTestEnumWithValue
        restFieldTestEnumWithValueMockMvc.perform(delete("/api/field-test-enum-with-values/{id}", fieldTestEnumWithValue.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<FieldTestEnumWithValue> fieldTestEnumWithValueList = fieldTestEnumWithValueRepository.findAll();
        assertThat(fieldTestEnumWithValueList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
