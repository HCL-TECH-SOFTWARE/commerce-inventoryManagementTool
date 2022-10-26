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
class StoreConfigurationService extends __BaseService {


  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Get Store theme configuration by name and storeId
   * @param params object having Configuration name and storeId
   * 
   */
  getStoreConfByIdAndNameResponse(params: any): __Observable<__StrictHttpResponse<any>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/store-configurations?storeId=${params.storeId}&${params.name}`,
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

  /**
     * Get Store theme configuration by name and storeId
     * @param params object having Configuration name and storeId
     * 
     */
  getStoreConfByIdAndName(params): __Observable<any> {
    return this.getStoreConfByIdAndNameResponse(params).pipe(
      __map(_r => _r.body)
    );
  }

  /**
   * Delete Store theme configuration by name and storeId
   * @param params object having Configuration name and storeId
   * 
   */
  deleteStoreConfByIdAndNameResponse(params: any): __Observable<__StrictHttpResponse<any>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/rest/admin/v2/store-configurations/storeId:${params.storeId},name:${params.name}`,
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

  /**
     * Delete Store theme configuration by name and storeId
     * @param params object having Configuration name and storeId
     * 
     */
  deleteStoreConfByIdAndName(params): __Observable<any> {
    return this.deleteStoreConfByIdAndNameResponse(params).pipe(
      __map(_r => _r.body)
    );
  }

  /**
   * Update Store theme configuration by name and storeId
   * @param params object having Configuration name and storeId
   * @param data configuration data
   */
  updateStoreConfByIdAndNameResponse(params: any, data): __Observable<__StrictHttpResponse<any>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/rest/admin/v2/store-configurations/storeId:${params.storeId},name:${params.name}`,
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

  /**
   * Update Store theme configuration by name and storeId
   * @param params object having Configuration name and storeId
   * @param data configuration data
   */
  updateStoreConfByIdAndName(params, data): __Observable<any> {
    return this.updateStoreConfByIdAndNameResponse(params, data).pipe(
      __map(_r => _r.body)
    );
  }

  /**
     * Get Store theme configuration by name
     * @param nameStr Configuration name
     */

  getStoreConfByNameResponse(nameStr: any): __Observable<__StrictHttpResponse<any>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rest/admin/v2/store-configurations?${nameStr}`,
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
  /**
     * Get Store theme configuration by name
     * @param nameStr Configuration name
     */
  getStoreConfByName(nameStr): __Observable<any> {
    return this.getStoreConfByNameResponse(nameStr).pipe(
      __map(_r => _r.body)
    );
  }

  /**
   * Save Store theme configuration
   * 
   */
  saveStoreConfigurationResponse(confbody): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = confbody;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/rest/admin/v2/store-configurations`,
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
   * @param Profile A profile.
   */
  saveStoreConfiguration(Profile): __Observable<null> {
    return this.saveStoreConfigurationResponse(Profile).pipe(
      __map(_r => _r.body as null)
    );
  }


}

module StoreConfigurationService {


}

export { StoreConfigurationService }
