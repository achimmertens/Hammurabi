import { Component, OnInit } from '@angular/core';
import {Account} from '../account';
import { AccountService } from '../account.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {
  accounts: Account[]=[];
  selectedAccount?: Account;

  onSelect(account: Account): void {
    this.selectedAccount = account;
    this.messageService.add(`HeroesComponent: Selected hero id=${account.id}`);
  }

  
  getAccounts(): void {
    this.accountService.getAccounts()
        .subscribe(accounts => this.accounts = accounts);
  }

 
  constructor(private accountService: AccountService, private messageService: MessageService) { }

  ngOnInit(): void {
   this.getAccounts();
  }

}
