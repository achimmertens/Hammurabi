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
  account: Account = JSON.parse('{"id":"0","name":"Dummy","nickname":"Achim was here","logindate":"2022-07-27T10:04:29.663Z"}');
  selectedAccount: any;

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
    // addAccount(account: Account): Observable<any> {
    //this.selectedAccount = this.account.name;
    //  this.user=this.users.find( ({id}) =>  id === '595f280e557291a9750ebf9f');

    console.log("start finding...")
    this.accountService.getAccounts()
      .subscribe(accounts => {
        this.accounts = accounts;
        console.log("accounts: ", accounts);
        console.log("accountname: ", this.account.name)
        const saccount = this.accounts[0].content.find(({ name }: { name: any }) => this.account.name === name)
        console.log("Der gefundene Account lautet:", saccount)
        console.log("Die gefundene Account-ID lautet:", saccount.id)
        this.selectedAccount = saccount;
      });


    /*

    this.http
    .get('https://jsonplaceholder.typicode.com/todos')
    .subscribe((res: JSON) => {
      this.promise = (res);
      console.log ("Res = ", res)
      console.log('Promise: ', this.promise);
      this.todo = this.promise.find(
        ({ id }) => id === 5
      );

    });



      startGame(account: Account): void {
        this.selectedAccount = account;
    /* Ähm, brauchen wir wohl gar nicht:
        if (account){  //({id}) =>  id === '595f280e557291a9750ebf9f');
          this.account.id = this.accounts.find( ({})  )
        }
            this.messageService.add(`AccountsComponent: Selected hero id=${this.selectedAccount.id}`);
      }
      */

  }
}
