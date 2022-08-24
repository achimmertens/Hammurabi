import { Component, OnInit } from '@angular/core';
import {Account} from '../account';
import { Level1 } from '../level1';
import { AccountService } from '../account.service';
import { MessageService } from '../message.service';
//import { Observable } from 'rxjs';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})

export class AccountsComponent implements OnInit {
  accounts: any; // accounts: Account[]=[] doesn't work, because then "content[]" is not found in html
  content: Level1[]=[];
  selectedAccount?: Account;
  
  constructor(private accountService: AccountService, private messageService: MessageService) { }

  ngOnInit(): void {
   this.getAccounts();
   this.getContent();
  }

  
  onSelect(account: Account): void {
    this.selectedAccount = account;
    this.messageService.add(`AccountsComponent: Selected hero id=${account.id}`);
  }
  

getAccounts(): void {
  this.accountService.getAccounts()
  .subscribe(accounts => this.accounts= accounts);
}

getContent(): void {
  this.accountService.getLevel1()
  .subscribe(content => this.content= content);
}

delete(account: Account): void {
  //this.accounts = this.accounts.filter(h => h !== account);
  this.accountService.deleteAccount(account.id).subscribe();
}

/*
add(name: string): void {
  name = name.trim();
  if (!name) { return; }
  this.accountService.addAccount({ name } as Account)
    .subscribe(hero => {
      this.accounts.push(hero);
    });
}


add(account: Account): void {
  if (!account) { return; }
  this.accountService.addAccount(account)
    .subscribe(account => {
      this.accounts[0].push(account);
    });
}

*/



}
