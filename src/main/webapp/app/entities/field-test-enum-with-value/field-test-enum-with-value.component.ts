import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IFieldTestEnumWithValue } from 'app/shared/model/field-test-enum-with-value.model';
import { FieldTestEnumWithValueService } from './field-test-enum-with-value.service';
import { FieldTestEnumWithValueDeleteDialogComponent } from './field-test-enum-with-value-delete-dialog.component';

@Component({
  selector: 'my-prefix-field-test-enum-with-value',
  templateUrl: './field-test-enum-with-value.component.html'
})
export class FieldTestEnumWithValueComponent implements OnInit, OnDestroy {
  fieldTestEnumWithValues?: IFieldTestEnumWithValue[];
  eventSubscriber?: Subscription;

  constructor(
    protected fieldTestEnumWithValueService: FieldTestEnumWithValueService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.fieldTestEnumWithValueService
      .query()
      .subscribe((res: HttpResponse<IFieldTestEnumWithValue[]>) => (this.fieldTestEnumWithValues = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInFieldTestEnumWithValues();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IFieldTestEnumWithValue): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInFieldTestEnumWithValues(): void {
    this.eventSubscriber = this.eventManager.subscribe('fieldTestEnumWithValueListModification', () => this.loadAll());
  }

  delete(fieldTestEnumWithValue: IFieldTestEnumWithValue): void {
    const modalRef = this.modalService.open(FieldTestEnumWithValueDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.fieldTestEnumWithValue = fieldTestEnumWithValue;
  }
}
