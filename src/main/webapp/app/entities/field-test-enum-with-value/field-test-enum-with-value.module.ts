import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SampleWebsocketSharedModule } from 'app/shared/shared.module';
import { FieldTestEnumWithValueComponent } from './field-test-enum-with-value.component';
import { FieldTestEnumWithValueDetailComponent } from './field-test-enum-with-value-detail.component';
import { FieldTestEnumWithValueUpdateComponent } from './field-test-enum-with-value-update.component';
import { FieldTestEnumWithValueDeleteDialogComponent } from './field-test-enum-with-value-delete-dialog.component';
import { fieldTestEnumWithValueRoute } from './field-test-enum-with-value.route';

@NgModule({
  imports: [SampleWebsocketSharedModule, RouterModule.forChild(fieldTestEnumWithValueRoute)],
  declarations: [
    FieldTestEnumWithValueComponent,
    FieldTestEnumWithValueDetailComponent,
    FieldTestEnumWithValueUpdateComponent,
    FieldTestEnumWithValueDeleteDialogComponent
  ],
  entryComponents: [FieldTestEnumWithValueDeleteDialogComponent]
})
export class SampleWebsocketFieldTestEnumWithValueModule {}
