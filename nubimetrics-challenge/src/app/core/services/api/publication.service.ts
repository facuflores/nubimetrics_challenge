import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

import { Observable, of, EMPTY } from 'rxjs';
import { map, concatMap, expand, toArray } from "rxjs/operators";

import * as fastFilter from 'fast-filter';
import * as sort from 'fast-sort';

import * as Api from './../constants';
import { Publication } from '../../models/publication.model';
import { ResponseApi } from '../../models/response-api.model';

@Injectable({
  providedIn: 'root'
})
export class PublicationService {

  private TOTAL_PUBLICATION: number = 100;

  constructor(private http: HttpClient) {}

  private buildPublications(response: ResponseApi): ResponseApi {
    const publications = response.results.map((data) => new Publication(data));
    response.results = publications;
    return response;
  }

  private buildHttpParams(params: any): HttpParams {
    const httpParams = new HttpParams()
      .set("q", `${params[0]}`)
      .set("offset", `${params[1]}`)
      .set("limit", `${params[2]}`);
    return httpParams;
  }

  public searchPublications(text: string, offset: number, limit: number): Observable<ResponseApi> {
    const httpParams = this.buildHttpParams(arguments);
    return this.http.get<ResponseApi>(Api.default.SEARCH_PUBLICATIONS, {  params: httpParams }).pipe(
      map(response => this.buildPublications(response))
    );
  }

  public searchAllPublications(text: string, offset: number, limit: number): Observable<Publication[]> {
    return this.searchPublications(text, offset, limit).pipe(
      expand(({paging}: ResponseApi) =>
        paging.offset < this.TOTAL_PUBLICATION && paging.offset < paging.total ?
          this.searchPublications(text, paging.offset + limit, limit) : EMPTY
      ),
      concatMap(({results}: ResponseApi) => results),
      toArray()
    );
  }

  public orderPublicationByPrice(order: string, publications: Publication[]): Observable<Publication[]> {
    return of(publications).pipe(
      map((publications: Publication[]) => {
        switch(order) {
          case 'desc': return sort(publications).desc((pbl: Publication) => pbl.price);
          case 'asc': return sort(publications).asc((pbl: Publication) => pbl.price);
          default: return publications;
        }
      })
    );
  }

  public orderPublicationBySoldQuantity(order: string, publications: Publication[]): Observable<Publication[]> {
    return of(publications).pipe(
      map((publications: Publication[]) => {
        switch(order) {
          case 'desc': return sort(publications).desc((pbl: Publication) => pbl.sold_quantity);
          case 'asc': return sort(publications).asc((pbl: Publication) => pbl.sold_quantity);
          default: return publications;
        }
      })
    );
  }

  public filterPublicationsByCondition(condition: string, publications: Publication[]): Observable<Publication[]> {
    return of(publications).pipe(
      map((publications: Publication[]) => {
        return fastFilter(publications, function(publication: Publication) {
          return publication.condition == condition;
        });
      })
    );
  }

  public filterPublicationsByRangePrice(min: number, max: number, publications: Publication[]): Observable<Publication[]> {
    return of(publications).pipe(
      map((publications: Publication[]) => {
        return fastFilter(publications, function(publication: Publication) {
          return publication.price >= min && publication.price <= max;
        });
      })
    );
  }

}