# Creation Of The Hammurabi Game Part 8 - Get Content From The Hive API

Hello Hive-, Java-, Node.js-, Angular-, Docker-freaks,
Hello all others,



In the long run I want to create a simple game with the name "Hammurabi", which uses i.e. Hive content to influence the run of play.
![](https://images.hive.blog/0x0/https://files.peakd.com/file/peakd-hive/achimmertens/23vhpzAunKDXtohLemRj1DKQegshSGYBNPfMAtKrE3VyW8MDJXQk7wxpvUasbdGV6aqb9.png)

# Table of Content:
- [Creation Of The Hammurabi Game Part 8 - Get Content From The Hive API](#creation-of-the-hammurabi-game-part-8---get-content-from-the-hive-api)
- [Table of Content:](#table-of-content)
- [Getting Content From Hive](#getting-content-from-hive)
- [Updating the Code](#updating-the-code)
  - [Interface](#interface)
  - [account.service.ts](#accountservicets)
  - [account-detail.component.ts:](#account-detailcomponentts)
  - [account-detail.component.html:](#account-detailcomponenthtml)
- [Result](#result)


-----


# Getting Content From Hive
In [my last documentation](https://peakd.com/hive-169321/@achimmertens/creation-of-the-hammurabi-game-part-7-rebuild-the-frontend-in-angular) I showed, how I have created a code in Angular, which is able to do some basic CRUD (Create, Read, Update, Delete)-functions.
![](https://images.hive.blog/0x0/https://files.peakd.com/file/peakd-hive/achimmertens/23w3CwUTSSHTvRg4R6AuStqgN9ZsiNYiNuB5qNgVnAebjLvJDrYuSCrH3pvThkvu5FDcP.png)


Now I want to get the first content from outside my testlaboratory. Of course I took the Hive-API as an example.

![grafik.png](https://files.peakd.com/file/peakd-hive/achimmertens/48RQemyS6Pk7t5P4C1gtTUbByKwDyFf5NDkkLxRHawFweGrmD65FEUimwkankxEegP.png)
[origin](https://app.diagrams.net/#Wd0b9c15585e7f424%2FD0B9C15585E7F424!151955)

A lot of internet services offer a so called API (Application Programming Interface), so that other services (or people) can read their content in a standard JSON format.
Here is an example, how one can get data from the Hive API:

![grafik.png](https://files.peakd.com/file/peakd-hive/achimmertens/23t7BUoWuAUyhGVV9U4DJTmQWk2ag5dv2gGrYnmsxXTD1L3Yew2Juqnx5rkcFdnYuuE2k.png)

So, the curl command opens a URL and puts some request-data and we get a result back.
To get more information about the Hive-API, read:
https://developers.hive.io/apidefinitions/#condenser_api.get_discussions_by_author_before_date

In our case, I ask for the last 3 posts, that a user has written. Here I do it with postman:

![grafik.png](https://files.peakd.com/file/peakd-hive/achimmertens/23tSyz4Yx6r1PghTB28WSPBpyhK3jyTevtVXNaWZxbSW2xgeALKXWyJMSLrLyj4cWMWyE.png)
The result is:

![grafik.png](https://files.peakd.com/file/peakd-hive/achimmertens/23tSzWXZGUJAq88nJRUMeN4dD6pNbBRfbgAACpPhXau8oznoY3mPqL6P3xzbqsvomqsK7.png)
We can do this with Angular also:

# Updating the Code
## Interface 
The content of a Hivepost has a format, which we can see in the curl answer or in the browser:

![grafik.png](https://files.peakd.com/file/peakd-hive/achimmertens/23vsr87jMzyVyYYeYDxEocwQUexgxRTCPJsDdApFUFpo7qQhtYDs7Tu8kTQCMQvzeX4ns.png)
At the moment we are just interested in one field, namly "created", but later I want to evaluate also other fields.
So, we have to take the efford and create an interface, that maps the JSON fields, we get from the Hive-API.
I did it, by copying the JSON answer and transfering the values into fields:

![grafik.png](https://files.peakd.com/file/peakd-hive/achimmertens/23swi6E1PGtTTEiZUhdc3uvtWbF9DMumKQLf2R6j3YCZV8XQNMA37ttRCDqviLekFiJNh.png)

```
export interface HiveBlog {
    jsonrpc: number,
    result:
    [{
        author: String,
        permlink: String,
        category: String,
        title: String,
        body: String,
        json_metadata: String[],
        created: Date,
        last_update: Date,
        depth: number,
        children: number,
        last_payout: Date,
        cashout_time: Date,
        total_payout_value: String,
        curator_payout_value: String,
        pending_payout_value: String,
        promoted: String,
        replies: String[],
        body_length: number,
        author_reputation: number,
        parent_author: String,
        parent_permlink: String,
        url: String,
        root_title: String,
        beneficiaries: String[],
        max_accepted_payout: String,
        percent_hbd: number,
        post_id: number,
        net_rshares: number,
        active_votes: String[]
    }]
}
```



## account.service.ts

So, now we can import this structure into our service:

![grafik.png](https://files.peakd.com/file/peakd-hive/achimmertens/23tkhS9n5k6JRfgz23hxRZPb9Lv8CehMMogSVSf65wPt5Jcg77rTFdmL91JdfUKBf3ZJV.png)

The body I want to send to Hive is:

> {"jsonrpc":"2.0", "method":"condenser_api.get_discussions_by_author_before_date", "params":["loginname","","",3], "id":1}

But the loginname shall be replaced by a name, which we can fill in a form. We come later in the html-file back to this. The name is given by requesting the method "getLogindate(name:string)". So we can replace the loginname with this given name:

> const body2 = JSON.stringify(body).replace('loginname', \`${name}`);

The rest is more or less the same as the other post requests:

![grafik.png](https://files.peakd.com/file/peakd-hive/achimmertens/23t74ySd61XcnK1kHfSxAGG9GkZUM6Apqxcozqn9QguPC4HVBRipHrF8Wo6Gm8WV2T1zV.png)

```
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Account } from './account';
import { MessageService } from './message.service';
import { HiveBlog } from './hive-blog';
import { Level1 } from './level1';
@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private accountsUrl = "http://192.168.2.121:8080/api/accounts"
  private accountUrl = "http://192.168.2.121:8080/api/account"
  private deleteUrl = "http://192.168.2.121:8080/api/delete"
  private hiveBlogUrl = "https://api.hive.blog"
  private postContent = "{\"jsonrpc\":\"2.0\", \"method\":\"condenser_api.get_discussions_by_author_before_date\", \"params\":[\"achimmertens\",\"\",\"\",3], \"id\":1}";
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
    //const body = '{"id":"0","name":"Dummy","nickname":"Achim was here","logindate":"2022-07-27T10:04:29.663Z"}';
    //const url = `${this.accountUrl}`;
    const url = "http://192.168.2.121:8080/api/account";
    console.log("Die url lautet: "+ url);
    console.log("Der Body vom Post lautet: " + body);
    console.log("Die httpOptions sind: " + JSON.stringify(this.httpOptions));
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
  /** -------------------------- Hive Methods --------------------------
   *  Hive is a Social Media Blockchain. Here we search their API for some transactions
   */
  /** GET last logindate in Hive for an Account */
  getLogindate(name:string): Observable<HiveBlog> {
    const body = {"jsonrpc":"2.0", "method":"condenser_api.get_discussions_by_author_before_date", "params":["loginname","","",3], "id":1};
    const body2 = JSON.stringify(body).replace('loginname', `${name}`);
    const url = `${this.hiveBlogUrl}`; //const url = "https://api.hive.blog"; 
    console.log("Die url lautet: "+ url);
    console.log("Der Body vom Post lautet: " + JSON.stringify(body2));
    console.log("Die httpOptions sind: " + JSON.stringify(this.httpOptions));
  //return this.http.post(url, body2, this.httpOptions)
  return this.http.post<HiveBlog>(url, body2, this.httpOptions)
  .pipe(
    catchError((err) => {
      console.error(err);
      throw err;
    }
    ));
}
/* Todo: GetUpvoters
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


## account-detail.component.ts:
In this component we use the accountService.getlogindate method. We get a result back and the format of this return value has to be defined first.
Here we could say, that this value shall be saved in the variable "hiveBlog", the type can be any and we start with an empty array:

![grafik.png](https://files.peakd.com/file/peakd-hive/achimmertens/23tGTrE7JgyRf3JSEj38g3D69fw6apAzcudrkaRTFzwextFxYGSTEionwGsi2B1v4Lx1s.png)

As I wrote in my [last post](https://peakd.com/hive-169321/@achimmertens/creation-of-the-hammurabi-game-part-7-rebuild-the-frontend-in-angular), this may not be the best way, but it works.
But better we use the right format for hiveBlog:

![grafik.png](https://files.peakd.com/file/peakd-hive/achimmertens/23tRrXcKTZhZAXtgNzbTihnoiRFo3T3BtXoCUiRDpAsyufsVUdNJ6BVaP8W1dHoJM6sPC.png)

Now we can create the getLogindate method. We transfer the account.name, which we get from the form in the html code:

![grafik.png](https://files.peakd.com/file/peakd-hive/achimmertens/Eo1vv3CiVuAsQQJoCjYEd3sy9Lyq4Es44HwNbxSN9EhNvhY96XxhCoSwNyRwQ4BeX1a.png)

This.setLogindate() is a method, which is executed within the subscribe block. This means, it will only be executed, when all data from the accountservice was loaded. If we called this method from somewhere outside the subscription, we had to execute the getlogindate twice (first to get the data and then to fill in the loaded value).
Here is the setLogindate method:

![grafik.png](https://files.peakd.com/file/peakd-hive/achimmertens/23swgMxLkbtJe8c2VcaMxSpmNMo1QZC762sVQUHDaBdFN2MncsEXH1rn9DXvw2XQrthYf.png)


```
import { Component, OnInit, Input } from '@angular/core';
import { Account } from '../account';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { AccountService } from '../account.service';
import { HiveBlog } from '../hive-blog';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.css']
})
export class AccountDetailComponent implements OnInit {
  account: Account | undefined;
  hiveBlog: HiveBlog | undefined;
  utcDate: number = 0;
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private accountService: AccountService) { }
  ngOnInit(): void {
    this.getAccount();
  }
  /* 
  ngOnChanges() {
    ///** WILL TRIGGER WHEN PARENT COMPONENT UPDATES '**
    ...
  }
*/
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
  getLogindate(): void {
    if (this.account) {
      this.accountService.getLogindate(this.account.name)
        //.subscribe(() => this.goBack());
        .subscribe((xxx) => {
          this.hiveBlog = (xxx);
          console.log('this.hiveBlog: ', this.hiveBlog);
          this.setLogindate();
        });
    }
  }
  setLogindate(): void{
    if (this.account){
      {
        if (this.hiveBlog) {this.account.logindate =new Date(this.hiveBlog.result[0].created)}
      }
    }
  }
}
```

## account-detail.component.html:
Here we have a simple html page, that allows us to see (and change) the content of one of our accounts:

![grafik.png](https://files.peakd.com/file/peakd-hive/achimmertens/23t77MJmqbQdjNphvCPfTo8Vx8N15Lg59qhazoDmgNQdN89QRXn2TNkcnfT2nYyfLCWXn.png)

In the browser it looks like this:

![grafik.png](https://files.peakd.com/file/peakd-hive/achimmertens/23wqbymzsRgooZQ9JfUzECU9qpvX6SzSegPfiQ8b9sNm1ShGkaJ1F6J3fVEK4hETKR15S.png)

The content of the fields is taken from our Java backend and described in my former posts.
But now we want to add content from Hive. By clicking on "get Hive lastlogindate", the value of "Account name" is taken and send to our account.service.ts.
As soon as we get content for "hiveBlog", is will be shown on the page:

![grafik.png](https://files.peakd.com/file/peakd-hive/achimmertens/23tGW1XvQ78xJZiYtiKqXQTphCcRqnVZTjYunBt1vT6utiQ3EpDP1tkYCDorDickUUtmD.png)


![grafik.png](https://files.peakd.com/file/peakd-hive/achimmertens/23vhuHMUBGCuLcWKopGUS4YuZ7M4m86W1FXJgqnSGDTod6jsFQm91Acm1rgAGKHjoL6Bg.png)

```
<section class="about-section text-center" id="Details">
  <div class="container px-4 px-lg-5" *ngIf="account">
    <h2>{{account.name | uppercase}} Details</h2>
    <div class="badge">
      <label for="account-id">Account ID: </label>
      <input id="account-id" [(ngModel)]="account.id" placeholder="id">
      <label for="account-name">Account name: </label>
      <input id="account-name" [(ngModel)]="account.name" placeholder="name">
      <label for="account-nickname"> Nickname: </label>
      <input id="account-nickname" [(ngModel)]="account.nickname" placeholder="nickname">
      <label for="account-logindate"> Logindate: </label>
      <input id="account-logindate" [(ngModel)]="account.logindate" placeholder="logindate">
    </div>
    <button class="button" type="button" (click)="goBack()">go back</button>
    <button class="button" type="button" (click)="save()">save</button>
    <button class="button" type="button" (click)="getLogindate()">get Hive lastlogindate</button>
  </div>
  <div class="badge" *ngIf="hiveBlog">
    <p> Creationdate of last hiveBlog: {{hiveBlog.result[0].created}} </p>
  </div>
</section>
```


# Result
You can find the complete code on: [github](https://github.com/achimmertens/Hammurabi/tree/frontend/frontend).

When we type in an in Hive existing account name and press on the "get Hive Lastlogindate" button, we get the date of the last created post of this Hive account:

![grafik.png](https://files.peakd.com/file/peakd-hive/achimmertens/23tSMw7tpgj6WkqWt4ckp1CKTcD8oFhuuxtM6oLzMDGuVa4uJq9avKCxzqB5n898W2ECE.png)

By clicking on "get Hive lastlogindate" we get the content of the last three posts on Hive.


![grafik.png](https://files.peakd.com/file/peakd-hive/achimmertens/23w3CQCv5kqqXzEdh6xL9gcUZRTB2y2UAKstyRsgSSibnhQrrFEtXqz51E558GRs3s6gj.png)

From the latest post, we take the creationdate and put it into the field "logindate" from our account object. And then we can save this into our own database.


With this the chain is closed. Now we are able to take any web content that exists via the API interface in the internet. We can use Hive content, stock market values, the wheather, my solary batterie status, some memes, cat content,… and put it into our game.
But first, I want to make the style nicer and put some logic into the code, so that we can start calling this code as a game.

So stay tuned,

@jaraumoses: I hope it was ok, to take your post as an example ;-)

Achim Mertens