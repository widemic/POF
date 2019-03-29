import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {Suplier, IProductsResponse} from './suplier.class';

@Injectable()
export class CustomerService {

  constructor(private http: HttpClient) {}

  search(filter: {name: string} = {name: ''}, page = 1): Observable<IProductsResponse> {
    return this.http.get<IProductsResponse>('/api/products')
    .pipe(
      tap((response: IProductsResponse) => {
        response.results = response.results
          .map(product => new Suplier(product.id, product.name, product.um, product.price))
          // Not filtering in the server since in-memory-web-api has somewhat restricted api
          .filter(product => product.name.includes(filter.name))

        return response;
      })
      );
  }
}
