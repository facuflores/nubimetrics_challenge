import { Paging } from './paging.model';
import { Publication } from './publication.model';

export interface ResponseApi {
  site_id: string;
  query: string;
  paging: Paging;
  results: Publication[];
}