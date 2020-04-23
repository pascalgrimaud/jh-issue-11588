import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IFieldTestEnumWithValue } from 'app/shared/model/field-test-enum-with-value.model';

@Component({
  selector: 'my-prefix-field-test-enum-with-value-detail',
  templateUrl: './field-test-enum-with-value-detail.component.html'
})
export class FieldTestEnumWithValueDetailComponent implements OnInit {
  fieldTestEnumWithValue: IFieldTestEnumWithValue | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ fieldTestEnumWithValue }) => (this.fieldTestEnumWithValue = fieldTestEnumWithValue));
  }

  previousState(): void {
    window.history.back();
  }
}
