import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Account } from '../models/account';

@Injectable({
  providedIn: 'root'
})
export class AccountStateService {

  private account: BehaviorSubject<Account>;

  get account$() { return this.account.asObservable(); }

  constructor() { 
    this.account = new BehaviorSubject<Account>({id: '', username: ''});
    this.loadAccount();
  }

  setAccount(account: Account) : void {
    this.account.next(account);
    this.saveAccount();
  }

  removeAccount() : void {
    this.account.next({id: '', username: ''});
    localStorage.removeItem('username');
    localStorage.removeItem('userid');
  }

  saveAccount() : void {
    localStorage.setItem('username', this.account.getValue().username);
    localStorage.setItem('userid', this.account.getValue().id);
  }

  loadAccount() : void {
    let account: Account = {
      id: localStorage.getItem('userid') as string,
      username: localStorage.getItem('username') as string
    };

    if (account.id && account.username)
      this.account.next(account);
  }
}
