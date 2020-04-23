import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SampleWebsocketTestModule } from '../../../test.module';
import { FieldTestEnumWithValueDetailComponent } from 'app/entities/field-test-enum-with-value/field-test-enum-with-value-detail.component';
import { FieldTestEnumWithValue } from 'app/shared/model/field-test-enum-with-value.model';

describe('Component Tests', () => {
  describe('FieldTestEnumWithValue Management Detail Component', () => {
    let comp: FieldTestEnumWithValueDetailComponent;
    let fixture: ComponentFixture<FieldTestEnumWithValueDetailComponent>;
    const route = ({ data: of({ fieldTestEnumWithValue: new FieldTestEnumWithValue(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SampleWebsocketTestModule],
        declarations: [FieldTestEnumWithValueDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(FieldTestEnumWithValueDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(FieldTestEnumWithValueDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load fieldTestEnumWithValue on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.fieldTestEnumWithValue).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
