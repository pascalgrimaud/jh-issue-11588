import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SampleWebsocketTestModule } from '../../../test.module';
import { FieldTestEnumWithValueComponent } from 'app/entities/field-test-enum-with-value/field-test-enum-with-value.component';
import { FieldTestEnumWithValueService } from 'app/entities/field-test-enum-with-value/field-test-enum-with-value.service';
import { FieldTestEnumWithValue } from 'app/shared/model/field-test-enum-with-value.model';

describe('Component Tests', () => {
  describe('FieldTestEnumWithValue Management Component', () => {
    let comp: FieldTestEnumWithValueComponent;
    let fixture: ComponentFixture<FieldTestEnumWithValueComponent>;
    let service: FieldTestEnumWithValueService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SampleWebsocketTestModule],
        declarations: [FieldTestEnumWithValueComponent]
      })
        .overrideTemplate(FieldTestEnumWithValueComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(FieldTestEnumWithValueComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(FieldTestEnumWithValueService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new FieldTestEnumWithValue(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.fieldTestEnumWithValues && comp.fieldTestEnumWithValues[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
