import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'field-test-enum-with-value',
        loadChildren: () =>
          import('./field-test-enum-with-value/field-test-enum-with-value.module').then(m => m.SampleWebsocketFieldTestEnumWithValueModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class SampleWebsocketEntityModule {}
