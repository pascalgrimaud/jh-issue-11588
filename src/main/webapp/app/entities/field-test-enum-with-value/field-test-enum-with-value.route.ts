import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IFieldTestEnumWithValue, FieldTestEnumWithValue } from 'app/shared/model/field-test-enum-with-value.model';
import { FieldTestEnumWithValueService } from './field-test-enum-with-value.service';
import { FieldTestEnumWithValueComponent } from './field-test-enum-with-value.component';
import { FieldTestEnumWithValueDetailComponent } from './field-test-enum-with-value-detail.component';
import { FieldTestEnumWithValueUpdateComponent } from './field-test-enum-with-value-update.component';

@Injectable({ providedIn: 'root' })
export class FieldTestEnumWithValueResolve implements Resolve<IFieldTestEnumWithValue> {
  constructor(private service: FieldTestEnumWithValueService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IFieldTestEnumWithValue> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((fieldTestEnumWithValue: HttpResponse<FieldTestEnumWithValue>) => {
          if (fieldTestEnumWithValue.body) {
            return of(fieldTestEnumWithValue.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new FieldTestEnumWithValue());
  }
}

export const fieldTestEnumWithValueRoute: Routes = [
  {
    path: '',
    component: FieldTestEnumWithValueComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'sampleWebsocketApp.fieldTestEnumWithValue.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: FieldTestEnumWithValueDetailComponent,
    resolve: {
      fieldTestEnumWithValue: FieldTestEnumWithValueResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'sampleWebsocketApp.fieldTestEnumWithValue.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: FieldTestEnumWithValueUpdateComponent,
    resolve: {
      fieldTestEnumWithValue: FieldTestEnumWithValueResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'sampleWebsocketApp.fieldTestEnumWithValue.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: FieldTestEnumWithValueUpdateComponent,
    resolve: {
      fieldTestEnumWithValue: FieldTestEnumWithValueResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'sampleWebsocketApp.fieldTestEnumWithValue.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
