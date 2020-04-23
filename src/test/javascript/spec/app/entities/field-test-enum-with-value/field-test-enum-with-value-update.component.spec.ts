import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { SampleWebsocketTestModule } from '../../../test.module';
import { FieldTestEnumWithValueUpdateComponent } from 'app/entities/field-test-enum-with-value/field-test-enum-with-value-update.component';
import { FieldTestEnumWithValueService } from 'app/entities/field-test-enum-with-value/field-test-enum-with-value.service';
import { FieldTestEnumWithValue } from 'app/shared/model/field-test-enum-with-value.model';

describe('Component Tests', () => {
  describe('FieldTestEnumWithValue Management Update Component', () => {
    let comp: FieldTestEnumWithValueUpdateComponent;
    let fixture: ComponentFixture<FieldTestEnumWithValueUpdateComponent>;
    let service: FieldTestEnumWithValueService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SampleWebsocketTestModule],
        declarations: [FieldTestEnumWithValueUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(FieldTestEnumWithValueUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(FieldTestEnumWithValueUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(FieldTestEnumWithValueService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new FieldTestEnumWithValue(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new FieldTestEnumWithValue();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
