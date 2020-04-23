import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FieldTestEnumWithValueService } from 'app/entities/field-test-enum-with-value/field-test-enum-with-value.service';
import { IFieldTestEnumWithValue, FieldTestEnumWithValue } from 'app/shared/model/field-test-enum-with-value.model';
import { MyEnumA } from 'app/shared/model/enumerations/my-enum-a.model';
import { MyEnumB } from 'app/shared/model/enumerations/my-enum-b.model';
import { MyEnumC } from 'app/shared/model/enumerations/my-enum-c.model';

describe('Service Tests', () => {
  describe('FieldTestEnumWithValue Service', () => {
    let injector: TestBed;
    let service: FieldTestEnumWithValueService;
    let httpMock: HttpTestingController;
    let elemDefault: IFieldTestEnumWithValue;
    let expectedResult: IFieldTestEnumWithValue | IFieldTestEnumWithValue[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(FieldTestEnumWithValueService);
      httpMock = injector.get(HttpTestingController);

      elemDefault = new FieldTestEnumWithValue(0, MyEnumA.AAA, MyEnumB.AAA, MyEnumC.AAA);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a FieldTestEnumWithValue', () => {
        const returnedFromService = Object.assign(
          {
            id: 0
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new FieldTestEnumWithValue()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a FieldTestEnumWithValue', () => {
        const returnedFromService = Object.assign(
          {
            myFieldA: 'BBBBBB',
            myFieldB: 'BBBBBB',
            myFieldC: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of FieldTestEnumWithValue', () => {
        const returnedFromService = Object.assign(
          {
            myFieldA: 'BBBBBB',
            myFieldB: 'BBBBBB',
            myFieldC: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a FieldTestEnumWithValue', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
