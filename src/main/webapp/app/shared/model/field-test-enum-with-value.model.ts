import { MyEnumA } from 'app/shared/model/enumerations/my-enum-a.model';
import { MyEnumB } from 'app/shared/model/enumerations/my-enum-b.model';
import { MyEnumC } from 'app/shared/model/enumerations/my-enum-c.model';

export interface IFieldTestEnumWithValue {
  id?: number;
  myFieldA?: MyEnumA;
  myFieldB?: MyEnumB;
  myFieldC?: MyEnumC;
}

export class FieldTestEnumWithValue implements IFieldTestEnumWithValue {
  constructor(public id?: number, public myFieldA?: MyEnumA, public myFieldB?: MyEnumB, public myFieldC?: MyEnumC) {}
}
