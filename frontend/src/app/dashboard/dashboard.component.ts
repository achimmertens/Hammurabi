import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';
import { Account } from '../account';
import { MessageService } from '../message.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  accounts: any;
  //account: any; <- doesnt work here. We need a pre filled value, otherwise we see nothing in the page
  account: Account = JSON.parse('{"id":"0","name":"","nickname":"","logindate":"2022-07-27T10:04:29.663Z"}');
  selectedAccount: any //Account = this.account;

  constructor(private accountService: AccountService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.getAccounts();
  }

  getAccounts(): void {
    if (this.accounts) {
      this.accountService.getAccounts()
        .subscribe(accounts => {
          this.accounts = accounts;
        });
    }
  }

  findID(): void {
    console.log("start finding...")
    this.accountService.getAccounts()
      .subscribe(accounts => {
        this.accounts = accounts;
        console.log("accounts: ", accounts);
        console.log("accountname: ", this.account.name)
        try {
          const foundAccount = this.accounts[0].content.find(({ name }: { name: any }) => this.account.name === name)
          console.log("Der gefundene Account lautet:", foundAccount)
          console.log("Die gefundene Account-ID lautet:", foundAccount.id)
          this.selectedAccount = foundAccount;
          this.account =foundAccount;

          console.log("Die gefundene Account-ID lautet:", foundAccount.id)
        }
        catch {
          console.error("There was no account ID found")

        }
     
 
        
      });
  }
}
