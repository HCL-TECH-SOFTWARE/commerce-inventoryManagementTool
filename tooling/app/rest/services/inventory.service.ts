/**
*==================================================
Copyright [2022] [HCL America, Inc.]
 
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at
 
    http://www.apache.org/licenses/LICENSE-2.0
 
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*==================================================
**/

/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
class InventoryService extends __BaseService {


  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  updateInventoryResponse(invData,params): __Observable<__StrictHttpResponse<any>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = invData;
    let req = new HttpRequest<any>(
      'PATCH',
       this.rootUrl + `/rest/admin/v2/inventories/catalogEntryId:${params.catalogEntryId.toString()},storeId:${params.storeId.toString()},fulfillmentCenterId:${params.fulfillmentCenterId.toString()}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<any>;
      })
    );
  }

  updateInventory(invdata,params): __Observable<any> {
    return this.updateInventoryResponse(invdata,params).pipe(
      __map(_r => _r.body)
    );
  }

  deleteInventoryResponse(params): __Observable<__StrictHttpResponse<any>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    // if (params.catalogEntryId != null) __params = __params.set('catalogEntryId', params.catalogEntryId.toString());
    //  if (params.storeId != null) __params = __params.set('storeId', params.storeId.toString());
    // if (params.fulfillmentCenterId != null) __params = __params.set('fulfillmentCenterId', params.fulfillmentCenterId.toString());
    
    let req = new HttpRequest<any>(
      'DELETE',
      //this.rootUrl+`/rest/admin/v2/inventories`,
      this.rootUrl + `/rest/admin/v2/inventories/catalogEntryId:${params.catalogEntryId.toString()},storeId:${params.storeId.toString()},fulfillmentCenterId:${params.fulfillmentCenterId.toString()}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<any>;
      })
    );
  }

  deleteInventory(params): __Observable<any> {
    return this.deleteInventoryResponse(params).pipe(
      __map(_r => _r.body)
    );
  }

  getFullfilmentCentersResponse(storeId): __Observable<__StrictHttpResponse<any>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (storeId != null) __params = __params.set('storeId', storeId.toString());
    
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/fulfillment-centers`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<any>;
      })
    );
  }

  getFullfilmentCenters(storeId): __Observable<any> {
    return this.getFullfilmentCentersResponse(storeId).pipe(
      __map(_r => _r.body)
    );
  }

  getInventoryResponse(params): __Observable<__StrictHttpResponse<any>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let dir = params.sortdirection === 'asc' ? '+':'-';
    if (params.catalogEntryId != null) __params = __params.set('catalogEntryId', params.catalogEntryId.toString());
    if (params.offset != null) __params = __params.set('offset', params.offset.toString());
    if (params.limit != null) __params = __params.set('limit', params.limit.toString());
    if (params.storeId != null) __params = __params.set('storeId', params.storeId.toString());
    if (params.fulfillmentCenterId != null) __params = __params.set('fulfillmentCenterId', params.fulfillmentCenterId.toString());
    if (params.sortOrder != null) __params = __params.set('sort', params.sortOrder.toString());

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/inventories`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<any>;
      })
    );
  }

  getInventory(params): __Observable<any> {
    return this.getInventoryResponse(params).pipe(
      __map(_r => _r.body)
    );
  }
  
  /**
   * Save Store theme configuration
   * 
   */
  saveInventoryResponse(confbody): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = confbody;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/rest/admin/v2/inventories`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }

  /**
   * Save Store theme configuration
   * @param inventoryData A profile.
   */
  saveInventory(inventoryData): __Observable<null> {
    return this.saveInventoryResponse(inventoryData).pipe(
      __map(_r => _r.body as null)
    );
  }


}

module InventoryService {


}

export { InventoryService }
