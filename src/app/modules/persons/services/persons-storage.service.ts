import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { delay, tap, filter } from 'rxjs/operators';
import { Person } from '../models/person';

@Injectable({
  providedIn: 'root'
})
export class PersonsStorageService {

  private persons: BehaviorSubject<Array<Person>>;
  
  constructor() {
    this.persons = new BehaviorSubject(new Array<Person>());
  }

  get persons$() {
    return this.persons.asObservable();
  }

  set(persons: Array<Person>) {
    this.persons.next(persons);
  }

  create(person: Person) {
    this.persons.next([...this.persons.getValue(), person]);
  }  

  remove(id: string) {
    this.persons.next(this.persons.getValue().filter(x => x.id != id));
  }

  update(id: string, person: Person) {
    let items = this.persons.getValue();
    let findIndex = items.findIndex(p => p.id == id);
    items[findIndex] = person;
    this.persons.next(items);
  }
}
