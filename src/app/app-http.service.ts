import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/toPromise';

interface Options {
    limit?:number;
}

@Injectable()
export class AppHttpService {
  private url: string;
  private header: Headers;

  constructor (private http: Http) {
    this.setAccessToken();
  }

  setAccessToken () {
    let token = '9f8387bd4a9a054884adfda6221a2b4fe5cc341b';
    this.header = new Headers({'Authorization': 'Bearer ' + token});
  }

  builder (resource: string) {
    this.url = 'https://app.squidfacil.com.br/api/products';
    return this;
  }

  list (options: Options = {}) {
    let url = this.url;

    if (options.limit === undefined) {
      options.limit = 30;
    }

    url += '?limit=' + options.limit;

    return this.http.get(url, {headers: this.header})
      .toPromise()
      .then(response => response.json()._embedded.product);
  }

  view (id: number | string) {
    return this.http.get('https://app.squidfacil.com.br/api/products')
      .toPromise()
      .then(response => response.json()._embedded.product);
  }

  update (id: number, data: Object) {
    return this.http.put(this.url + '/' + id, data, {headers: this.header})
      .toPromise()
      .then(response => response.json()._embedded.product);

  }

  insert ( product: Object) {
    return this.http.post(this.url, product, {headers: this.header})
      .toPromise()
      .then(response => response.json()._embedded.product);
  }

  delete (id: number) {
    return this.http.delete(this.url + '/' + id, {headers: this.header})
      .toPromise()
      .then(response => response.json()._embedded.product);
  }
}
