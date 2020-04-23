import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IFieldTestEnumWithValue } from 'app/shared/model/field-test-enum-with-value.model';

type EntityResponseType = HttpResponse<IFieldTestEnumWithValue>;
type EntityArrayResponseType = HttpResponse<IFieldTestEnumWithValue[]>;

@Injectable({ providedIn: 'root' })
export class FieldTestEnumWithValueService {
  public resourceUrl = SERVER_API_URL + 'api/field-test-enum-with-values';

  constructor(protected http: HttpClient) {}

  create(fieldTestEnumWithValue: IFieldTestEnumWithValue): Observable<EntityResponseType> {
    return this.http.post<IFieldTestEnumWithValue>(this.resourceUrl, fieldTestEnumWithValue, { observe: 'response' });
  }

  update(fieldTestEnumWithValue: IFieldTestEnumWithValue): Observable<EntityResponseType> {
    return this.http.put<IFieldTestEnumWithValue>(this.resourceUrl, fieldTestEnumWithValue, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IFieldTestEnumWithValue>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IFieldTestEnumWithValue[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
