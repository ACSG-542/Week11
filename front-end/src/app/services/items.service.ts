import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}/items`);
  }

  create( newItem ): Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}/item`, {item: newItem});
  }

  delete( removeItem, id): Observable<any> {  	
  	let options = { item: removeItem, _id: id};
  	return this.httpClient.request<any>('DELETE', `${environment.apiUrl}/remove`, { body: options });
  }
}
