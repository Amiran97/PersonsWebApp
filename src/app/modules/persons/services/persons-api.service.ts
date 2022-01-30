import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Person } from '../models/person';


@Injectable({
  providedIn: 'root'
})
export class PersonsApiService {

  readonly url: string = environment.personsApiUrl;

  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<Array<Person>> {
    return this.httpClient.get<Array<Person>>(this.url);      
  }

  create(person: Person): Observable<Person> {
    return this.httpClient.post<Person>(this.url, person);      
  }

  remove(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.url}/${id}`);      
  }

  update(id: string, person: Person): Observable<Person> {
    return this.httpClient.put<Person>(`${this.url}/${id}`, person);     
  }
}