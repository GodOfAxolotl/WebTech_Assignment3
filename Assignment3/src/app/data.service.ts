// data.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface ApiItem {
  type: string;
  ident: string;
  name: string;
}

@Injectable({ providedIn: 'root' })
export class DataService {
  private mashupServerUrl = "https://cmnet.communitymashup.net/json/";

  constructor(private http: HttpClient) {}

  getMashupData(): Observable<ApiItem[]> {
    return this.http.get<any>(this.mashupServerUrl).pipe(
      map(data => data.dataset.items)
    );
  }
}
