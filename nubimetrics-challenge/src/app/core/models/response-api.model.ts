import { Paging } from './paging.model';
import { Publication } from './publication.model';

/**
 * Modelo de Respuesta del Api
 */
export interface ResponseApi {
  site_id: string;
  query: string;
  paging: Paging;
  results: Publication[];
}