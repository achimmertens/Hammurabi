import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Account } from './account';
import { MessageService } from './message.service';
import { ACCOUNTS } from './mock-accounts';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  accounts = ACCOUNTS;

  constructor(private messageService: MessageService) { }


  getAccounts(): Observable<Account[]> {
    const accounts = of(ACCOUNTS);
    this.messageService.add('AccountService: fetched accounts');
    return accounts;
  }


/*
getAccounts (): Observable<Account[]>{
  const accounts = of(ACCOUNTS);
 // const ACCOUNTS: Account[]=[
 //   {id:1, name:"Achim Mertens", nickname:"Greensniper",logindate: new Date('2022-08-11T11:08:47.884Z')},
 //   {id:2, name:"Annette Mertens", nickname:"Schnuffel",logindate: new Date('2022-08-11T11:08:47.884Z')}
//]
  return accounts;
*/



  

}
