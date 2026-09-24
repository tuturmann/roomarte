import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ArtService {
  private http = inject(HttpClient);

  private baseUrl = 'https://collectionapi.metmuseum.org/public/collection/v1';

  getArtworkDetails(id: number) {
    return this.http.get(`${this.baseUrl}/objects/${id}`);
  }
}