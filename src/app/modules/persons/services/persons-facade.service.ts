import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Person } from '../models/person';
import { PersonsApiService } from './persons-api.service';
import { PersonsStorageService } from './persons-storage.service';

@Injectable({
    providedIn: 'root'
  })
export class PersonsFacadeService {
    constructor(
        private personsApi: PersonsApiService,
        private personsStorage: PersonsStorageService) { 
          this.load();
      }
    
      get persons$() {
        return this.personsStorage.persons$;
      }

      gerById(id: string) : Observable<Person> {
        return this.personsApi.getById(id);
      }
    
      create(person: Person) : Observable<Person> {
        return this.personsApi.create(person).pipe(
          tap(data => this.personsStorage.create(data)));
      }
    
      remove(id: string) : Observable<void> {
        return this.personsApi.remove(id).pipe(
          tap(() => this.personsStorage.remove(id)));
      }

      update(id: string, person: Person) : Observable<Person> {
          return this.personsApi.update(id, person).pipe(
              tap(data => this.personsStorage.update(id, data)));
      }

      private clear() {
        this.personsStorage.set([]);  
      }

      private load() {
        this.personsApi.getAll()
          .subscribe(data => this.personsStorage.set(data));
      }
}