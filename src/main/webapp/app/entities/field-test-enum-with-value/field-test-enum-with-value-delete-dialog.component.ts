import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IFieldTestEnumWithValue } from 'app/shared/model/field-test-enum-with-value.model';
import { FieldTestEnumWithValueService } from './field-test-enum-with-value.service';

@Component({
  templateUrl: './field-test-enum-with-value-delete-dialog.component.html'
})
export class FieldTestEnumWithValueDeleteDialogComponent {
  fieldTestEnumWithValue?: IFieldTestEnumWithValue;

  constructor(
    protected fieldTestEnumWithValueService: FieldTestEnumWithValueService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.fieldTestEnumWithValueService.delete(id).subscribe(() => {
      this.eventManager.broadcast('fieldTestEnumWithValueListModification');
      this.activeModal.close();
    });
  }
}
