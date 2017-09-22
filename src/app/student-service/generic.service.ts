import {Headers, Http, RequestOptions, Response, URLSearchParams} from '@angular/http';
import {Observable} from 'rxjs';
import {Injector} from '@angular/core';

export default class GenericService {

  protected http;

  protected BASE_URL = 'http://localhost:3000/student/api/';

  constructor(injector: Injector) {
    this.http = injector.get(Http);
  }

  /**
   * Perform get request with specified option to server.
   * @param options? optional optionEntries, if this is null, then this method will perform getAll.
   * @returns Observable has type T[] that match the specified option.
   */
  protected get(options?: RequestOptions): Observable<any> {
    return this.request(options)
      .map(this.extractData);
  }

  /**
   * Perform POST request with specified option to server.
   * @param data: is object needs to be POSTed to server.
   * @returns Observable response from server
   */
  protected post(data: Object): Observable<Response> {
    return this.request(this.defaultPostOptions(data));
  }

  /**
   * Perform request with optional option merged with defaultRequestOptions to server.
   * @param options? optional option, if this is null, then this method will perform get.
   * @returns Observable has type Response
   */
  protected request(options?: RequestOptions): Observable<Response> {
    return this.http.request(this.BASE_URL, this.defaultRequestOptions().merge(options));
  }

  /**
   * Returns a default RequestOptions instance with default Headers
   */
  protected defaultRequestOptions(): RequestOptions {
    return new RequestOptions({
      headers: this.defaultGetHeaders()
    })
  }

  /**
   * Returns a default Headers instance for GET method
   */
  protected defaultGetHeaders(): Headers {
    return new Headers({
      'Accept': 'application/json'
    });
  }

  /**
   * Returns a default RequestOptions instance for POST method with
   * @param data is object needs to be posted
   * @return RequestOptions for POST method
   */
  private defaultPostOptions(data: Object) {
    return new RequestOptions({
      method: 'POST',
      url: this.BASE_URL,
      body: this.convertObjectToJson(data),
      headers: this.defaultPostHeaders()
    });
  }

  /**
   * Returns a default Headers instance for POST method
   */
  protected defaultPostHeaders(): Headers {
    return new Headers({
      'Content-Type': 'application/json'
    });
  }

  /**
   * Stringify Object JSON string
   * @param data is an object
   * @return JSON string
   */
  private convertObjectToJson(data: Object) {
    return JSON.stringify(data);
  }

  protected extractData(resp: Response): Array<any> {
    return resp.json();
  }
}
