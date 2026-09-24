import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ArtFallbackService {
  private http = inject(HttpClient);

  private baseUrl = 'https://www.wikidata.org/wiki';

  getArtworkFallbackDetails(id: number) {
    return this.http.get(`${this.baseUrl}/${id}`);
  }
}