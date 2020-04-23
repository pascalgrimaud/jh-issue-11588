import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IFieldTestEnumWithValue, FieldTestEnumWithValue } from 'app/shared/model/field-test-enum-with-value.model';
import { FieldTestEnumWithValueService } from './field-test-enum-with-value.service';

@Component({
  selector: 'my-prefix-field-test-enum-with-value-update',
  templateUrl: './field-test-enum-with-value-update.component.html'
})
export class FieldTestEnumWithValueUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    myFieldA: [],
    myFieldB: [],
    myFieldC: []
  });

  constructor(
    protected fieldTestEnumWithValueService: FieldTestEnumWithValueService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ fieldTestEnumWithValue }) => {
      this.updateForm(fieldTestEnumWithValue);
    });
  }

  updateForm(fieldTestEnumWithValue: IFieldTestEnumWithValue): void {
    this.editForm.patchValue({
      id: fieldTestEnumWithValue.id,
      myFieldA: fieldTestEnumWithValue.myFieldA,
      myFieldB: fieldTestEnumWithValue.myFieldB,
      myFieldC: fieldTestEnumWithValue.myFieldC
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const fieldTestEnumWithValue = this.createFromForm();
    if (fieldTestEnumWithValue.id !== undefined) {
      this.subscribeToSaveResponse(this.fieldTestEnumWithValueService.update(fieldTestEnumWithValue));
    } else {
      this.subscribeToSaveResponse(this.fieldTestEnumWithValueService.create(fieldTestEnumWithValue));
    }
  }

  private createFromForm(): IFieldTestEnumWithValue {
    return {
      ...new FieldTestEnumWithValue(),
      id: this.editForm.get(['id'])!.value,
      myFieldA: this.editForm.get(['myFieldA'])!.value,
      myFieldB: this.editForm.get(['myFieldB'])!.value,
      myFieldC: this.editForm.get(['myFieldC'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IFieldTestEnumWithValue>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }
}
