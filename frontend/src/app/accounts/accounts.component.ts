import { Component, OnInit } from '@angular/core';
import {Account} from '../account';
import { AccountService } from '../account.service';
//import { MessageService } from '../message.service';
//import { Observable } from 'rxjs';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})

export class AccountsComponent implements OnInit {
  accounts: Account[]=[];
  selectedAccount?: Account;
  
  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
   this.getAccounts();
  }

  /*
  onSelect(account: Account): void {
    this.selectedAccount = account;
    this.messageService.add(`HeroesComponent: Selected hero id=${account.id}`);
  }
  */

  /*
  getAccounts(): void {
    this.accountService.getAccounts()
        .subscribe(accounts => this.accounts = accounts);
  }
*/

getAccounts(): void {
  this.accountService.getAccounts()
  .subscribe(accounts => this.accounts = accounts);
}


}

/*
<h2>My Accounts</h2>
<ul class="accounts">
  <li *ngFor="let account of accounts">
    <button [class.selected]="account === selectedAccount" type="button" (click)="onSelect(account)">
      <span class="badge">{{account.id}}</span>
      <span class="name">{{account.name}}</span>
    </button>
  </li>
</ul>

<div *ngIf="selectedAccount">
  <h2>{{selectedAccount.name | uppercase}} Details</h2>
  <div>id: {{selectedAccount.id}}</div>
  <div>
    <label for="account-name">Account name: </label>
    <input id="account-name" [(ngModel)]="selectedAccount.name" placeholder="name">
  </div>
  <div>Nickname: {{selectedAccount.nickname}}</div>
  <div>Logindate: {{selectedAccount.logindate}}</div>
</div>
*/