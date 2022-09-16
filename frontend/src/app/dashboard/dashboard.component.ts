import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';
import { Account } from '../account';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  accounts: any;
  account: Account = JSON.parse('{"id":"0","name":"Dummy","nickname":"Achim was here","logindate":"2022-07-27T10:04:29.663Z"}');
  selectedAccount?: Account;

  constructor(private accountService: AccountService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.getAccounts();
  }

  getAccounts(): void {
    this.accountService.getAccounts()
      .subscribe(accounts => this.accounts = accounts);
  }

  startGame(account: Account): void {
    this.selectedAccount = account;
    this.messageService.add(`AccountsComponent: Selected hero id=${account.id}`);
  }
}