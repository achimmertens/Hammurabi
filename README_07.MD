Creation Of The Hammurabi Game Part 7 - Rebuild The Frontend In Angular

Hello Hive-, Java-, node.js-, React-, Angular-, docker-freaks,
Hello all others,

In the long run I want to create a simple game with the name "Hammurabi", which uses Hive content to influence the run of play.
![](https://images.hive.blog/0x0/https://files.peakd.com/file/peakd-hive/achimmertens/23vhpzAunKDXtohLemRj1DKQegshSGYBNPfMAtKrE3VyW8MDJXQk7wxpvUasbdGV6aqb9.png)

In [my last documentation](https://peakd.com/hive-169321/@achimmertens/creation-of-the-hammurabi-game-part-6-enable-appjsx-to-call-crud-api-commands) I showed, how I have added some buttons in React, which enabled my frontend to connect to my Java code to Create, Read, Update or Delete (CRUD) some data in my ElasticSearch database.
![](https://images.hive.blog/0x0/https://files.peakd.com/file/peakd-hive/achimmertens/23w3CwUTSSHTvRg4R6AuStqgN9ZsiNYiNuB5qNgVnAebjLvJDrYuSCrH3pvThkvu5FDcP.png)

Now I want to rebuild this React code into Angular code. (This is because I want to develop in Angular in future, because I need it in my job and most people in my environment say Angular is better then React.)

-----
# Content:
- [Content:](#content)
  - [- Conclusion:](#--conclusion)
- [Install Angular](#install-angular)
- [Delete Welcome Page And Start From Scratch](#delete-welcome-page-and-start-from-scratch)
- [Creation Of The First Components](#creation-of-the-first-components)
  - [Create The Accounts Component](#create-the-accounts-component)
- [CRUD with HttpClientModule](#crud-with-httpclientmodule)
  - [GET list of accounts](#get-list-of-accounts)
  - [GET single account](#get-single-account)
  - [Delete An Account](#delete-an-account)
  - [Update And Add An Account](#update-and-add-an-account)
- [The most important files:](#the-most-important-files)
  - [app.module.ts](#appmodulets)
  - [app.component.ts](#appcomponentts)
  - [app.component.html](#appcomponenthtml)
  - [app-routing.modules.ts](#app-routingmodulests)
  - [message.service.ts](#messageservicets)
  - [accounts.ts](#accountsts)
  - [account-detail.component.ts](#account-detailcomponentts)
  - [account-detail.component.html](#account-detailcomponenthtml)
  - [accounts.component.ts](#accountscomponentts)
  - [accounts.component.html](#accountscomponenthtml)
  - [dashboard.components.ts](#dashboardcomponentsts)
  - [dashboard.component.html](#dashboardcomponenthtml)
  - [message.component.ts](#messagecomponentts)
  - [message.component.html](#messagecomponenthtml)
  - [account.service.ts](#accountservicets)
- [Conclusion:](#conclusion)
-----
# Install Angular

After merging my code into a safe branch, I deleted my frontend folder.
Then I typed into the console:
> npm install -g @angular/cli

![grafik.png](https://files.peakd.com/file/peakd-hive/achimmertens/23tGVuuBVBGEM7uhwZWNsLRe922G9rP4zYJHtsGmduCsGSxHRAje6LnVoHLVeGVwXjPtF.png)

>cd ..
ng new frontend

I used default settings:

![grafik.png](https://files.peakd.com/file/peakd-hive/achimmertens/23tbHLQXFFzTqsvcis8gs8kNcJGL35vC2LtDDJ1yQLhhbvQE7Wu45L8hj8dTm5nTphUz1.png)

![grafik.png](https://files.peakd.com/file/peakd-hive/achimmertens/23tRtN6vEmuykjeteVJPRGBANCSgiJnxXE8mTAXxrn5RD82J2EETi2yA8gDmyzGjczmjT.png)

Now I can open the code with my favorite IDE, which is Visual Studio Code:
When opening the folder for the first time, I was asked to install the "Angular Language Service" package. I installed the plugin and also "Angular Schematics":

![grafik.png](https://files.peakd.com/file/peakd-hive/achimmertens/23tGc1BNXbRQT3K5EjY4onJCvysoC8TEBxpnEHJqgi1E8dewbQxhWY2jNL9Feh7y3tp5Q.png)

![grafik.png](https://files.peakd.com/file/peakd-hive/achimmertens/23t77MJS6EyBLhu5Z5Zgaq7D7K6VFqvE886LiAMjGxTR8wJKm8JdLB9ZcZyQwjpDEPYaE.png)

Now I am able to start the default Installation either via console with "ng serve --open" or via VisualStudioCode, by activating npm-scripts in the timeline and then clicking on "NPM-SKRIPTS/start ng serve":

![grafik.png](https://files.peakd.com/file/peakd-hive/achimmertens/23t78yK4NjtjcDLwa7gvscVQQnvqrBqrCZpUjuFySWRSvTJeByFQWvzZHcrqs1LFCPrkY.png)


![grafik.png](https://files.peakd.com/file/peakd-hive/achimmertens/Eo1wMTqEEDaeMKAh9pWDDAbd8UGKfTMzfHUsbKEAGZMhDp7Rhb52rzCvdMdvLCxv8no.png)

![grafik.png](https://files.peakd.com/file/peakd-hive/achimmertens/23t773RVEfEECZqSrrf1uco4JEQfniksH4J2mUu44pTGuKu4xrFE6ArhjmGRgcTwv1MQX.png)

You can see the result on your browser with http://localhost:4200 (or another port, if there are several angular instances running simultanesly):

![grafik.png](https://files.peakd.com/file/peakd-hive/achimmertens/23w387w1ZB84gZraHCqAgwhfznNMvHMqULeatUZsPmyezqaSD9mtA2X4JrhmqkjWPXHN5.png)

Yes, and that is a good advise for beginners: read the tutorial and work through the [Tour of Heros](https://angular.io/tutorial). How to setup the environment is also discribed [there](https://angular.io/guide/setup-local).

----------------------------------------

# Delete Welcome Page And Start From Scratch
We need to change some files:
app.component.ts: There we exchange the title into "Frontend":

![grafik.png](https://files.peakd.com/file/peakd-hive/achimmertens/23t76pMtPZJ1uFfeHxpkbvdWwzQPgdXdpSnUtjpp7a8qw9FHfM3yxdgTG4jijQAziSjWJ.png)
App.component.html: We delete everything and exchange it with:
``` <h2>{{title}}</h2>```

![grafik.png](https://files.peakd.com/file/peakd-hive/achimmertens/EpLfvK6whNMm5C8vr9AzXskpm3wFts3RbhUCF1PKnzWv657mSPSDvWQFRgjfVP74FXB.png)

# Creation Of The First Components
## Create The Accounts Component
I want to rebuild and adapt a little the tour of Heros. My "Heroes" are "Accounts". If you want to follow my steps, go to a command shell, go to the frontend folder and type in:
> ng generate component accounts

(If it doesn't work, because you use Windows Powershell, try this before:
> Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
Taken from: https://angular.io/guide/setup-local

)


![grafik.png](https://files.peakd.com/file/peakd-hive/achimmertens/23tRvMk44dV6y61duzTFy7kHbAt3zi3Gq4KEcxiFaSVRMjJwfp8VPK7Ckz1FtVYuqndkT.png)

Some new files have been created:

![grafik.png](https://files.peakd.com/file/peakd-hive/achimmertens/Eo43mfN4aig2rcjQ2AnF4XASzLNPEXo9VhjUNS2Ko9QhgsB1L5uzE14ACWqTELW3ftG.png)

Now we create the interface app/account.ts and fill in the format of our Account data:

![grafik.png](https://files.peakd.com/file/peakd-hive/achimmertens/23t76kXYWd2XRoUkP2D7N2kYocoZqR4PYpJXaMRNAXRgoZvCPGwm4DyF5PXfRhFMyEgvn.png)
This is an interface, which is used in other components.

We need some more components. 

To describe it all in detail doesn't make sense, because at the end it is more or less an adaption of the [Tour of Heros tutorial](https://angular.io/tutorial).
You can see my complete code on [github](https://github.com/achimmertens/Hammurabi/tree/frontend/frontend) and the most important files [below](#the-most-important-files).

Here are some of the steps I did to create more components:


> ng generate component account-detail

![grafik.png](https://files.peakd.com/file/peakd-hive/achimmertens/23tbMP43MtapHtQJhQU183TZMENPeTMTtKJnYkRPQ8FZoqvVSnS3ERxVQpn72wQqjhyke.png)

> ng generate service account

![grafik.png](https://files.peakd.com/file/peakd-hive/achimmertens/23tRxigTW36Wouup1wAMVyVWbsXwRXcpUnFLyisA5qznZoCW852hRG99jKCJvgEFxaaBv.png)

> ng generate module app-routing --flat --module=app

(see also: https://angular.io/tutorial/toh-pt5)

> ng generate component dashboard

The part with the HTTPClientModule is not in the tutorial, so I will explaint it here in detail:

# CRUD with HttpClientModule

In the Tour of [Heros tutorial](https://angular.io/tutorial) they work with a mock. So their data is listed in the code and the API connection is intercepted via the HttpClientInMemoryWebApiModule.
Here in my case I have a API [backend server](https://peakd.com/hive-169321/@achimmertens/creation-of-the-hammurabi-game-part-3-how-to-connect-java-hello-world-via-rest-api-to-an-elasticsearch-database), which runs on my Raspberry Pi on http://192.168.2.121:8080

So I needed to update their hero.service.ts ( in my case account.service.ts) to get the data from this real API. Here is the top of this service code:

![grafik.png](https://files.peakd.com/file/peakd-hive/achimmertens/Eo1wMU9xjeH4jw7zmH4pdXTHbkAsDtPSadck7atjLZtA8UpdotH6DwzgoBW5PVaR63z.png)

## GET list of accounts
With the following method from account.service.ts we get a JSON string from the API:

![grafik.png](https://files.peakd.com/file/peakd-hive/achimmertens/Eo44Mxv7VfpxxJE3mEE5teReynt1qvAdgNwULqx5jvVTG7C3WmR2YgzEuENvqYBWk2N.png)

The result in the browser is (after adapting also some other code components):

![grafik.png](https://files.peakd.com/file/peakd-hive/achimmertens/23tmmXSdULvnhoSrzSRYZ1Z4qC18pFrqDYgkA7XVSe1g2J2G3pzZgVwfx2LKcvENtcm8P.png)

In the beginning, I got a lot of "CORS Missing Allow Origin" messages:

![grafik.png](https://files.peakd.com/file/peakd-hive/achimmertens/23u6Z47xHxWHbPRoFDS4pzhfqMr9PYy5Lgu8JAMjELRUNbPrcXTmzQ2osKDJtd2p9jZUQ.png)

This was, because I just put it the wrong account-url. (It can also happen, if the http-headers are not sufficient).
After entering the rigt URL, the error was gone.

Now, to show a single element of this JSON string, we can do it in the html component by cascading the JSON array with {{accounts[x].content[y].id (or .name or .nickname or .logindate):

![grafik.png](https://files.peakd.com/file/peakd-hive/achimmertens/23tGVhrLx8Xga8JyGRiW2kJ5QT49JdLNAmArAUXPjHGFGdrfyDBshJcberLY8fLVMqzFv.png)

(But this works only, if I define in the account.service the content as "any" (see above). If I would define it as 'var content:Account[]=[];' as it is done in the tutorial and is needed for searching, I was not able find objects in the JSON array any more. (Maybe I find a solution for that later.))

In this html-file we create a loop, that runs through all acounts (here: accounts[0].content), and shows their elements account.id, account.name, account.nickname and account.logindate:


![grafik.png](https://files.peakd.com/file/peakd-hive/achimmertens/Eoiba5xQk2Greqs8uqpAofu62EvusJkaipJxTQuig91GGkxNS7TKk3AbSeTVPshozDE.png)

## GET single account
The following method from account.service.ts shows, how we get a single account with a given ID:

![grafik.png](https://files.peakd.com/file/peakd-hive/achimmertens/Eo44P3C3yze4GJa7b9AYrKX9XNwZLfTFe2E8ZitNy76wTYxoFYswjstGiNwuUYXHYaF.png)

In the account-detail.component.ts I execute this accountService.getAccount method with the wished account-ID:

![grafik.png](https://files.peakd.com/file/peakd-hive/achimmertens/Eo1vw7hkVM4LbNE6iWiUgzrP8o9CJ3NwwS8VWb2z8ChFihLUhwfFAzWJz8oGW62H8gb.png)

Now I can open the account-detail page with the wished ID: "/detail/{{account.id}}":

![grafik.png](https://files.peakd.com/file/peakd-hive/achimmertens/23tGViC1JLa8dSaFASETyU58snf6P4Gpe1YsFDDYKQMiyckuKUnzGR3sGbfW5eVKkdHvK.png)

The account-detail.html is opened with the given ID. Because of the getAccount method in account-detail.component.ts, the complete dataset of "account" is known.

![grafik.png](https://files.peakd.com/file/peakd-hive/achimmertens/23swhwXnaQX6VHTGSveRrYyxyxRiZQgm5eU784HPJucsqzbb5deBEW1pum484FYNEQ9P3.png)

The result is like this:

![grafik.png](https://files.peakd.com/file/peakd-hive/achimmertens/23tHbKgySHhNx1VpGSpYVVnmYSzFZNKT67mVRC7KKo3sQ7bAQErSJbD8QK42tBSUp68no.png)
## Delete An Account

I added the following method to account.service.ts:

![grafik.png](https://files.peakd.com/file/peakd-hive/achimmertens/23t76buhD36HTuAFALGtVWPSpXtnB1aF4EZHV7u6Y2Lre4DYgZqt6CMQPmWbMtst7uvGj.png)

And this to accounts.component.ts:

![grafik.png](https://files.peakd.com/file/peakd-hive/achimmertens/48GCANqVtsxzfoCkkVZtZtDui9CaqqTvrVJUGVXwGxFJCzXjZqm1ZhpVMrP9rSvm4C.png)

Now, I am able to delete an account in accounts.component.html. This generates a button to delete the marked account:

![grafik.png](https://files.peakd.com/file/peakd-hive/achimmertens/23tbGsSQkViwUgMSTrsE5iMBHirUhJcMW2ggWjmKW2Lp1nELuc2WDMSN6aLijZtZ8wRrW.png)

![grafik.png](https://files.peakd.com/file/peakd-hive/achimmertens/23wgma9c78RhFsrPM2et57KfjqgHgDwFsdqfurLh73i8RyGHtJfrhwTCPT68YgEoNkFth.png)

## Update And Add An Account
For this showcase I was lazy and mixed both together. Because a POST request can also update or generate an account in my database.

I added a router component to "add" a user with the ID "0" in the frontpage:

![grafik.png](https://files.peakd.com/file/peakd-hive/achimmertens/23tGViCfQWp9kRW9mWKeuZBfM11hiVR4VnJ94CrTwtptLMRvKAAT2PTKtVrohM8n936Sb.png)

The app-routing.modules.ts didn't change and looks like this:

![grafik.png](https://files.peakd.com/file/peakd-hive/achimmertens/23tGVqXUDwUu7yKLQkHYnEQPcfKTCaqHekRWFYe4fspow4rnePSadW3v2w5PTgBsGrkLp.png)

The Detail pages shows now the dummy account with ID=0.
To create a new account, one should change this ID and fill in the rest of the fields. (As I said, this is realy lazy developing ;-))

![grafik.png](https://files.peakd.com/file/peakd-hive/achimmertens/23tSym8QEvXUthreAnrS7vfK4ZVprECA9xarpvXUF3BVKNBxbCoda96h3rSj8QfVWRcdN.png)

By clicking the "save" button, in account-details.ts the method "save" is executed:

![grafik.png](https://files.peakd.com/file/peakd-hive/achimmertens/23t77B9E8yEUv2zu9y4ZcX8ZvGq8PiLVkwZR2djzP9XBgVoA5FAwqGHBqwnXzeNkfhEBE.png)

And this uses the accountService.addAccount method to post the data to the REST API server:

![grafik.png](https://files.peakd.com/file/peakd-hive/achimmertens/23swiJip2CjpN7WiFdDNFWHwYoaYhzKsMwD7wZ6RF7ZNUcpMA3CA3Mkh2bjjmFRy1gaVd.png)

# The most important files:
As Is said, you can see the complete code on [github](https://github.com/achimmertens/Hammurabi/tree/frontend/frontend)
The css files are not changed and can be taken from  [Heros tutorial](https://angular.io/tutorial).

Here are the files, (most of) that I have adapted:

![grafik.png](https://files.peakd.com/file/peakd-hive/achimmertens/23tGXhXRSJ8TRm3MPsgnc9itSri3dMgtHSQ2DeadAYfukR85BRs3d6hCSYLhtge3yuWea.png)


## app.module.ts
```
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AccountsComponent } from './accounts/accounts.component';
import { AccountDetailComponent } from './account-detail/account-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [
    AppComponent,
    AccountsComponent,
    AccountDetailComponent,
    MessagesComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

## app.component.ts
```
import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Frontend';
}
```

## app.component.html
```
<h2>{{title}}</h2>
<router-outlet>
  <nav>
    <a routerLink="/dashboard">Dashboard</a>
    <a routerLink="/accounts">Accounts</a>
    <a routerLink="/detail/0"> Add Account</a>
  </nav>
</router-outlet>
<hr />
<app-messages></app-messages>
```

## app-routing.modules.ts
```
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountDetailComponent } from './account-detail/account-detail.component';
import { AccountsComponent } from './accounts/accounts.component';
const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: AccountDetailComponent },
  { path: 'accounts', component: AccountsComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```


## message.service.ts
```
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class MessageService {
  messages: string[] = [];
  add(message: string) {
    this.messages.push(message);
  }
  clear() {
    this.messages = [];
  }
}
```

## accounts.ts
```
export interface Account {
    id: number;
    name: string;
    nickname: string;
    logindate: Date;
}
```

## account-detail.component.ts
```
import { Component, OnInit, Input } from '@angular/core';
import { Account } from '../account';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { AccountService } from '../account.service';
@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.css']
})
export class AccountDetailComponent implements OnInit {
 // @Input() account?: Account;
  account: Account | undefined;
  
  constructor( 
    private route: ActivatedRoute,   
    private location: Location, 
    private accountService:AccountService) { 
  }
  ngOnInit(): void {
    this.getAccount();
  }
  goBack(): void {
    this.location.back();
  }
  getAccount(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.accountService.getAccount(id)
    .subscribe(account => this.account = account);
  }
  
  save(): void {
    if (this.account) {
      this.accountService.addAccount(this.account)
        .subscribe(() => this.goBack());
    }
  }
}
```

## account-detail.component.html
```
<div *ngIf="account">
    <h2>{{account.name | uppercase}} Details</h2>
      <div>
      <label for="account-id">Account ID: </label>
      <input id="account-id" [(ngModel)]="account.id" placeholder="id">
      <label for="account-name">Account name: </label>
      <input id="account-name" [(ngModel)]="account.name" placeholder="name">
      <label for="account-nickname"> Nickname: </label>
      <input id="account-nickname" [(ngModel)]="account.nickname" placeholder="nickname">
      <label for="account-logindate"> Logindate: </label>
      <input id="account-logindate" [(ngModel)]="account.logindate" placeholder="logindate">
    </div>
    <button type="button" (click)="goBack()">go back</button>
    <button type="button" (click)="save()">save</button>
  </div>
```

## accounts.component.ts
```
import { Component, OnInit } from '@angular/core';
import { Account } from '../account';
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
  content: Level1[] = [];
  selectedAccount?: Account;
  constructor(private accountService: AccountService, private messageService: MessageService) { }
  ngOnInit(): void {
    this.getAccounts();
    //this.getContent();
  }
  onSelect(account: Account): void {
    this.selectedAccount = account;
    this.messageService.add(`AccountsComponent: Selected hero id=${account.id}`);
  }
  getAccounts(): void {
    this.accountService.getAccounts()
      .subscribe(accounts => this.accounts = accounts);
  }
  /* 
  getContent(): void {
    this.accountService.getLevel1()
    .subscribe(content => this.content= content);
  }
   */
  delete(account: Account): void {
    //this.accounts = this.accounts.filter(h => h !== account);  // Doesn't work with accounts:any, we need accounts: Account[]=[]
    this.accountService.deleteAccount(account.id).subscribe();
  }
}
```

## accounts.component.html
```
<h2>My Accounts</h2>
Die Account-ID vom ersten Datensatz lautet: {{accounts[0].content[0].id}}
<ul class="accounts">
  <li *ngFor="let account of accounts[0].content">
    <a routerLink="/detail/{{account.id}}">    
        <span class="badge">ID: {{account.id}}</span> Name: {{account.name}}, NickName: {{account.nickname}}, Logindate: {{account.logindate}}
    </a>
    <button type="button" class="delete" title="delete account"
    (click)="delete(account)">x</button>
  </li>
```

## dashboard.components.ts
```
import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  accounts: any;
  constructor(private accountService: AccountService) { }
  ngOnInit(): void {
    this.getAccounts();
  }
  getAccounts(): void {
    this.accountService.getAccounts()
      .subscribe(accounts => this.accounts = accounts);
  }
}
```

## dashboard.component.html
```
<h2>Menu</h2>
<h3> Rules:</h3>
Lorem Ipsum ...
<ul class="accounts-menu">
  <a *ngFor="let number of [].constructor(5), let x = index">
    {{accounts[0].content[x].name}}
  </a>
</ul>
<div *ngFor="let number of accounts[0].content, let x = index">
  id: {{accounts[0].content[x].id}}
  name: {{accounts[0].content[x].name}}
  nickname: {{accounts[0].content[x].nickname}}
  logindate: {{accounts[0].content[x].logindate}}
</div>
```

## message.component.ts
```
import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';
@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  constructor(public messageService: MessageService) {}
  ngOnInit() {
  }
}
```

## message.component.html
```
<div *ngIf="messageService.messages.length">
    <h2>Messages</h2>
    <button type="button"
            class="clear"
            (click)="messageService.clear()">Clear messages</button>
    <div *ngFor='let message of messageService.messages'> {{message}} </div>
  </div>
```

## account.service.ts
```
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Account } from './account';
import { MessageService } from './message.service';
import { Level1 } from './level1';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private accountsUrl = "http://192.168.2.121:8080/api/accounts"
  private accountUrl = "http://192.168.2.121:8080/api/account"
  private deleteUrl = "http://192.168.2.121:8080/api/delete"
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': '*/*'
    })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
  ) { }

  /** GET accounts from the server */
  getAccounts(): Observable<Account[]> {
    //var content:Account[]=[];
    var content: any;
    content = this.http.get<Account[]>(this.accountsUrl)
      .pipe(
        tap(_ => this.log('fetched accounts')),
        catchError(this.handleError<Account[]>('getAccounts', []))
      );
    this.log("Der Inhalt von content ist:" + JSON.stringify(content));
    return content;
  }

  /* Dies war ein Test um die Daten eine Ebene höher zu betrachten. Wurde aber nicht gebraucht.
  getLevel1(): Observable<Level1[]> {
    //var content:Level1[]=[];
    var content: any;
    content = this.http.get<Level1[]>(this.accountsUrl)
      .pipe(
        tap(_ => this.log('fetched accounts')),
        catchError(this.handleError<Level1[]>('getLevel1', []))
      );
    this.log("Der Inhalt von Content ist:" + JSON.stringify(content));

    return JSON.parse(content[0]);
  } */

  getAccount(id: number): Observable<Account> {
    const url = `${this.accountUrl}/${id}`;
    return this.http.get<Account>(url).pipe(
      tap(_ => this.log(`fetched account id=${id}`)),
      catchError(this.handleError<Account>(`getAccount id=${id}`))
    );
  }

  //////// Save methods //////////

  /** POST: add a new account to the server */
  addAccount(account: Account): Observable<any> {
    const body = JSON.stringify(account);
    const url = `${this.accountUrl}`;
    console.log("Der Body vom Post lautet:" + body);
    return this.http.post(url, body, this.httpOptions)
      .pipe(
        catchError((err) => {
          console.error(err);
          throw err;
        }
        ))
  }

  /** DELETE: delete the account from the server */
  deleteAccount(id: number): Observable<Account> {
    const url = `${this.deleteUrl}/${id}`;
    return this.http.delete<Account>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted account id=${id}`)),
      catchError(this.handleError<Account>('deleteAccount'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result 
   * */

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a AccountService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`AccountService: ${message}`);
  }
}
```
------------------------------------------------------

# Conclusion:
Now we are able to send CRUD (Create, Read, Update and Delete) requests to a real API Server via the Angular frontend.


![grafik.png](https://www.thebmc.co.uk/Handlers/ArticleImageHandler.ashx?id=7700&index=0&w=605&h=434)

[origin](https://www.thebmc.co.uk/Handlers/ArticleImageHandler.ashx?id=7700&index=0&w=605&h=434)

The next step will be to include other API servers from the internet and combine it with my accounts. I want to see the last logindate in [Hive](https://peakd.com) of a given username.
So stay tuned!!!

Regards, Achim