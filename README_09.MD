# Creation Of The Hammurabi Game Part 9 - Including The Hive Profile And Some Gamecode

Hello Hive-, Java-, Node.js-, Angular-, Docker-freaks,
Hello all others,



In the long run I want to create a simple game with the name "Hammurabi", which uses i.e. Hive content to influence the run of play.
![](https://images.hive.blog/0x0/https://files.peakd.com/file/peakd-hive/achimmertens/23vhpzAunKDXtohLemRj1DKQegshSGYBNPfMAtKrE3VyW8MDJXQk7wxpvUasbdGV6aqb9.png)

In [Creation Of The Hammurabi Game Part 8 - Get Content From The Hive API](https://peakd.com/hive-169321/@achimmertens/creation-of-the-hammurabi-game-part-8-get-content-from-the-hive-api) I showed how I get some data from outside the world, i.e. from the Hive-API, and how to include it in some Angular Code.

I showed how to read the logindate of the last post from an arbitrary hiveuser.


In this post here I want to show, how I added my Hive profile image and my Hive profile about text into my game.
I also added some logic, so that the very first basic feeling of a "game" can be found:
![grafik.png](https://files.peakd.com/file/peakd-hive/achimmertens/EpxvC4mYcf3coS7TeE3J7eHmwy2TdNSGp9K81CVBvBdchG2e8GqB9xs9uqFmY6FrPCz.png)

# Table Of Content:
- [Creation Of The Hammurabi Game Part 9 - Including The Hive Profile And Some Gamecode](#creation-of-the-hammurabi-game-part-9---including-the-hive-profile-and-some-gamecode)
- [Table Of Content:](#table-of-content)
- [Fetching The Hive Profile Image](#fetching-the-hive-profile-image)
  - [Creating The HiveAccount Interface](#creating-the-hiveaccount-interface)
  - [Creating the Profile interface](#creating-the-profile-interface)
- [Fetching the hiveprofile in account.service.ts](#fetching-the-hiveprofile-in-accountservicets)
  - [account-detail.component.ts](#account-detailcomponentts)
- [Finding a person](#finding-a-person)
  - [Find a person object with a given accountname](#find-a-person-object-with-a-given-accountname)
  - [Find this person in Hive](#find-this-person-in-hive)
  - [Extract the profile picture and about text](#extract-the-profile-picture-and-about-text)
- [Some Gamecode](#some-gamecode)
- [Outlook](#outlook)
  - [Why should someone play the game?](#why-should-someone-play-the-game)
  - [What's next?](#whats-next)
- [Disclaimer](#disclaimer)
- [----------------------------- Attachment: The Code  -------------------------------](#------------------------------attachment-the-code---------------------------------)
  - [hive-account.ts](#hive-accountts)
  - [account.service.ts](#accountservicets)
  - [account-detail.component.ts](#account-detailcomponentts-1)
  - [dashboard.component.ts](#dashboardcomponentts)
  - [dashboard.component.html](#dashboardcomponenthtml)
  - [game.component.ts](#gamecomponentts)
  - [game.component.html](#gamecomponenthtml)


# Fetching The Hive Profile Image
I want to see the profile image of an arbitrary Hive account.
The API post for this is:


>curl --location --request POST 'https://api.hive.blog' \
--header 'Content-Type: application/json' \
--data-raw '{"jsonrpc":"2.0", "method":"database_api.find_accounts", "params": {"accounts":["achimmertens"]}, "id":1}


![grafik.png](https://files.peakd.com/file/peakd-hive/achimmertens/23u6YysF9d1Ek4RLqPoQpAHxbvgzjYCZVBwbAJozCrMgrcxbHXXrRzeXjLEaLrSwYVNww.png)

(See: https://developers.hive.io/apidefinitions/#database_api.find_accounts)

So, as a result from the Hive API, I get a JSON string, which includes the link to my profile picture.

## Creating The HiveAccount Interface

To include a fetching component into my Angular code, first I need to create an interface in my Angular project, which contains all the fields of the JSON result. This is usualy some manual work, but there is a tool for creating interfaces from JSON-Strings. It is called "JSON to TS" and is a plugin for Visual Studio Code.


![grafik.png](https://files.peakd.com/file/peakd-hive/achimmertens/EoGr7KWe7cEosJxDjBaZrRJsVPrnR3AKJnZuSTsR26F72P4n9niR7SyCyyorscYPDwz.png)

After installing it, I copied the JSON result from Postman into the clipboard and pastet the content with Shift + Ctrl + Alt + V into a new created interface file. The tool creates then the interface content:

![grafik.png](https://files.peakd.com/file/peakd-hive/achimmertens/Eo1vxmcGuMNjKyKtWGLbkbGUAFhEa5hNCaHqRR6PbcUtjzyogo3KoWvB2Swe6LEk19z.png)

There I had to rename the automatecally created interface "Account"  into "HiveAccount", because "Account" already exists in my code. 
And I had to add "export" to this interface, to make it public in the rest of the code.

So, that saved a lot of work :-) .

## Creating the Profile interface

The next challenge was, that the image-url, that I want to get, is hidden in a sub-JSON string, as shown in this postman excerpt:


![grafik.png](https://files.peakd.com/file/peakd-hive/achimmertens/EopzDsi8pZAZ2t5AcCpSSiwiQaFLqucTApCRh6J2jFPD63ou3N6xmY2iChNhUVXAeGJ.png)


I took this string and put it into https://system.tips/Json/String-to-Json. The result was:
```
{"profile":{"profile_image":"https://steemitimages.com/DQmXEGDdBt2K83pmrsTzkzc4x4Q5xY53xcRMchAoC5qLnaT/Achim_steemit.png","name":"Achim Mertens","location":"Germany","website":"https://greensniper.wordpress.com/","about":"Love also your next but one and create more than you destroy.","twitter":"greensniper","youtube":"mertensachim","cover_image":"https://cdn.steemitimages.com/DQmXGLNUHpmGCRdjYMqmNt5A6LeY6FX7KD8jBR6QSdBSD4P/Das%20Wanderlied.png","ethereum":"0x35859bE71E2ddADbc080f0F6EdaA23F040fBC0C4"}}
```

With this, the backslashes are removed, but it is still a string. But now, I can convert this string into JSON, i.e. with: https://jsononline.net/string-to-json
Now the result is:

![grafik.png](https://files.peakd.com/file/peakd-hive/achimmertens/23tcNzkBFpZL2yAGTzQG5bVQjpX4ZcnnuSZjxNEo6VhfP2tZP8mTdUKmziDRztzM62yf3.png)


And this can be converted into an interface via the Visual Studio Code plugin "JSON to TS", as shown above. I added the "export interface Profile" part into my hive-account.ts interface:

```
interface RootObject {
  profile: Profile;
}
export interface Profile {
  profile_image: string;
  name: string;
  location: string;
  website: string;
  about: string;
  twitter: string;
  youtube: string;
  cover_image: string;
  ethereum: string;
}
```


# Fetching the hiveprofile in account.service.ts
In account.service.ts I added the interface:
>import {HiveAccount} from './hive-account';

And then I added the method getLoginImage (which was a copy and paste with some editings from getLoginDate (see my [last](https://peakd.com/hive-169321/@achimmertens/creation-of-the-hammurabi-game-part-8-get-content-from-the-hive-api) post):

![grafik.png](https://files.peakd.com/file/peakd-hive/achimmertens/Eo1vsBvWe6YWQVNsqSBw4LLY4X5nvmJs12k3orciVeWyRKojPM7Ww4u394xzsFRD6oc.png)
This service method opens the API url=https://api.hive.blog and puts the result into body2.

## account-detail.component.ts
In the "account-detail" component we use the getLoginImage method and insert the name of the Hive user.

![grafik.png](https://files.peakd.com/file/peakd-hive/achimmertens/23tbHA9mPD3WRz8Hk3FLqP5eKCXmdSAue7stk8uuDaCiCYguq1ec4qHdgEtWoYE7oJpbD.png)

![grafik.png](https://files.peakd.com/file/peakd-hive/achimmertens/23t773pRjtFw7rVQNsHuSbNw83jJEzFuEGyHmzM8Td8xSH7SMj4Tbj7aFJ147AXZbiSYX.png)

As a result we get a filled hiveAccount object.

# Finding a person

Now we have the following challenges:
	1. Find a person in my local database, with a given accountname
	2. Find this person in Hive
	3. Extract the profile picture and about text



## Find a person object with a given accountname

A JSON result of my elasticsearch database looks like this:


![grafik.png](https://files.peakd.com/file/peakd-hive/achimmertens/EoAh2PJN9971U3gVwJXprspn66epK7DeFg3ZTDkzF8zTtttX1mc3N4ZRrobTSou4d7D.png)
To match a person from this database and a person from Hive, I need an Account object from my database. But all I have is the accountname (from a field in the GUI). 

The magic happens with this codeline:

>const foundAccount = this.accounts[0].content.find(({ name }: { name: any }) => this.account.name === name)

It means, that I take the above JSON array, look into the result of this.accounts[0].content and search there for "this.account.name", which contains the name, for which I want to have the corresponding ID. 
As a result I get the complete dataset for this person, including the ID:

![grafik.png](https://files.peakd.com/file/peakd-hive/achimmertens/23uRLJaR6Qr3wYEp4uSXwqNf3NKDtYpdBjjiAo4U6Xw32QnRxBnY8bWSCUfWRdCMbiSmY.png)

It is important, that this codeline is executed within a subscription. Otherwise the content of the resulting JSON is probably empty (as it takes some time to get the data).

Here is my function findID() in dashboard.component.ts):

![grafik.png](https://files.peakd.com/file/peakd-hive/achimmertens/Eo43tkdqwLXj4pXoCPXcJPUzEJZ9piP6aatBQxxCSsyPH43vLpxynRwQxe8vkuqibKv.png)
*findID() in dashboard.component.ts*

The corresponding html code is like this:

![grafik.png](https://files.peakd.com/file/peakd-hive/achimmertens/48FiDgv27hS4fHXeQHFJ4h5aUPFBwGe5MwsuEs6Q6ntGKF3cxVeiUjEoxYur8KmPMa.png)
*from dashboard.component.html*

And the result on the browser shows us this:

![grafik.png](https://files.peakd.com/file/peakd-hive/achimmertens/EpGPgbTJJy9Mj9Cj7XtvmZ1V6sg5CpvQx8mN3uzBnyPCDuFiDNcEjccmJ3UqPxGrcmA.png)

## Find this person in Hive
The game is started with the parameter "id", because I want to know, who is this person in my database.
So first we get the account data set for the given ID:

![grafik.png](https://files.peakd.com/file/peakd-hive/achimmertens/23tGVYgvCxjhvd3WeNQQ3NFy4pRnYXfhMRFpaizQcnpNM7UkAq9pq7yCCXh2H3BBCvDX5.png)
*from game.component.ts*

![grafik.png](https://files.peakd.com/file/peakd-hive/achimmertens/23tGVGHbwxwSSyHteFW7za3vpEwB8H17xFXQGpdbvbQNqiDiq7BU2M6LaU41aHKWJJYMj.png)
*from account.service.ts*

Now we know the account.ID and also the account.name.

With this given (hive-)name, the getLoginImage(name) function is called.
It creates a post request to the Hive-API and sends the hive loginname:

![grafik.png](https://files.peakd.com/file/peakd-hive/achimmertens/Eo44KE3AWUBH2Q6BK7hRNdmxVi78W2FrAyL6FqKNkWZqbC6Mag5dSdca5m4gSYrKwCU.png)
*from account.service.ts*

As a result we get a JSON string in HiveAccount, which includes the profile data for this account:

![grafik.png](https://files.peakd.com/file/peakd-hive/achimmertens/23tcP5UHFJVcfVoWCRU2p6ZJHm4tQC6j2ub9dsmV5Hpk75YhX3edcUCGg3oxkRjnseVtr.png)

## Extract the profile picture and about text
Now we have got from the API a big and complicate cascaded JSON array in this.hiveAccount. The URL for the profile picture is included somewhere in "this.hiveAccount.result.accounts[0].json_metadata":

![grafik.png](https://files.peakd.com/file/peakd-hive/achimmertens/23x1b4dpe5diJHnfsc8vNmfZtHt9y2U3RZju1HsjLcTcxYxfXGmc4J3K448AXX2dr74go.png)

To make it more readable, I copied the object (that I can see in the browser with F12) and put it into the tool https://codebeautify.org/jsonviewer 

![grafik.png](https://files.peakd.com/file/peakd-hive/achimmertens/23uFw4zHnepDSdfLSNiq5MwP6uNrYZynEBJ796ri9SgGHrt9WHXc2LH1YYuX96bSoGJNt.png)
To open the knot I defined another variable, named "profile" and put there the content of hiveAccount.result.accounts[0].json_metadata:
>this.profile = JSON.parse(this.hiveAccount.result.accounts[0].json_metadata)
this.account.profileImage = this.profile.profile.profile_image;
this.account.about = this.profile.profile.about;


Now I get access to the profile_Image and the "about" text:

![grafik.png](https://files.peakd.com/file/peakd-hive/achimmertens/23tSzLNvsP9XgGcS1LxkRLzB5pfe8LbZfRypJMZaQRyPzPs7BvUY1a1gx6UUuNpeDQyMR.png)


![grafik.png](https://files.peakd.com/file/peakd-hive/achimmertens/Eo1vToN9gGiSJgbygm5aMFYGG1RDdUtaFh6Hhf52q1UWHinuapkURN5iRexygAyaojn.png)
*from game.component.ts*

And again, this all has to happen in a subscription.

So, now we have my picture and my banner text from Hive:

![grafik.png](https://files.peakd.com/file/peakd-hive/achimmertens/23tRxj9LNhHtfqVVUFdAB2jfz1phQMQ8fjdrdZGAF9tuYk8E9gn5R1BmzGT59ZDkuiC64.png)

![grafik.png](https://files.peakd.com/file/peakd-hive/achimmertens/23tbGoUxNsbF65XfKUhBW1k6AmaTT22AJYkVq82Jeq3K9K31jcYpttfM5eZ91GiqX9mQZ.png)
*from game.component.html*


# Some Gamecode

Hammurabi is going to be a round based game, where you have some start conditions, put in a taxrate and a amount of food, and try to prosper your folk. Try to get a max population after x rounds.


![grafik.png](https://files.peakd.com/file/peakd-hive/achimmertens/EobzJnb3N3xb2kAqvuanGe2TUsqZ7QXPS9mkj3TBhNTSX21Kskf9xzGQBtGyWMoWdqS.png)
*(ok, I know, that this is not a nice GUI yet ;-))*

With each round something magic happens with the parameters.

At the moment I try to create a deterministic chaos. That means, it is calculatable, but for a player you have to try some rounds, to find the best "curve" of what to enter when. 

![grafik.png](https://files.peakd.com/file/peakd-hive/achimmertens/23tw7xcBvtWhaKiNudesFKgnmR3LK7dpdArtxShNaUQTKjJzH7Fnwi6doapEas1rn74jM.png)
*taken from https://rechneronline.de/funktionsgraphen/*

You can find this formular in my code here (but I don't want to explain it in detail ;-) ):

![grafik.png](https://files.peakd.com/file/peakd-hive/achimmertens/23tRt5Ljr9YYaQPJnsT7c1m36EG5p3Dkbnc9iAx1CQuY2jC9nwZ5oKD6JiiVmFQJc48nn.png)
*taken from game.component.ts*


# Outlook
Later I want to mix this deterministic calculation with some real data from other sources (Bitcoin value, weather, Hive-writings (advertising),…) to influence the gameplay with some "chaos" or goodies from the outside.
So the players job is to do some reverse engineering (or stomache feelings) to find the best values for the gameplay.

## Why should someone play the game? 
To win ;-)

![grafik.png](https://files.peakd.com/file/peakd-hive/achimmertens/23yx26ozqfVPYfrKcffSmcJ4nbS3tLmSmJ5g9Q6JMVvg5HqEwVmcG2bzCKHgjKC8jdPHa.png)
*([origin](https://tripdoo.de/magazin/gewinnspiele-reisen-zubehoer))*

There will be a highscore list and I hope to find some players from the hive environment. That gives the possibility to reward the winners with tokens, that have a real value.

## What's next?

Now it goes for me into the details. I want to 
	- create a better frontend GUI
	- work on the game logic
	- include other API values to influence the gameplay
	- …
Later, when I think the game is ready for the public, I want to put my code into a docker container and test it on my raspberry pi. When there everything works fine, I want to put the code into a cloud infrastructure. That will be the point, when everyone can play the game.

But this is still a long way to go and as this is my hobby (and training practice for my business), I can only work on it, when I have time for it. 

So, stay tuned,

Achim Mertens
	
	


# Disclaimer

All this code is not perfect. I am a beginner and there are surely better ways to do it.
If you have some tipps or ideas, I would be happy to read them.


---

# ----------------------------- Attachment: The Code  -------------------------------

You can find my complete code in [github](https://github.com/achimmertens/Hammurabi)
Here are some excerpts:

## hive-account.ts

```
import { AccountsComponent } from "./accounts/accounts.component";

export interface HiveAccount {
    jsonrpc: string;
    result: Result;
    id: number;
}
interface Result {
    accounts: Accounts[];
}
interface Accounts {
    id: number;
    name: string;
    owner: Owner;
    active: Owner;
    posting: Posting;
    memo_key: string;
    json_metadata: string;
    posting_json_metadata: string;
    proxy: string;
    last_owner_update: string;
    last_account_update: string;
    created: string;
    mined: boolean;
    recovery_account: string;
    last_account_recovery: string;
    reset_account: string;
    comment_count: number;
    lifetime_vote_count: number;
    post_count: number;
    can_vote: boolean;
    voting_manabar: Votingmanabar;
    downvote_manabar: Votingmanabar;
    balance: Balance;
    savings_balance: Balance;
    hbd_balance: Balance;
    hbd_seconds: string;
    hbd_seconds_last_update: string;
    hbd_last_interest_payment: string;
    savings_hbd_balance: Balance;
    savings_hbd_seconds: string;
    savings_hbd_seconds_last_update: string;
    savings_hbd_last_interest_payment: string;
    savings_withdraw_requests: number;
    reward_hbd_balance: Balance;
    reward_hive_balance: Balance;
    reward_vesting_balance: Balance;
    reward_vesting_hive: Balance;
    vesting_shares: Balance;
    delegated_vesting_shares: Balance;
    received_vesting_shares: Balance;
    vesting_withdraw_rate: Balance;
    post_voting_power: Balance;
    next_vesting_withdrawal: string;
    withdrawn: number;
    to_withdraw: number;
    withdraw_routes: number;
    pending_transfers: number;
    curation_rewards: number;
    posting_rewards: number;
    proxied_vsf_votes: number[];
    witnesses_voted_for: number;
    last_post: string;
    last_root_post: string;
    last_post_edit: string;
    last_vote_time: string;
    post_bandwidth: number;
    pending_claimed_accounts: number;
    open_recurrent_transfers: number;
    is_smt: boolean;
    delayed_votes: any[];
    governance_vote_expiration_ts: string;
}
interface Balance {
    amount: string;
    precision: number;
    nai: string;
}
interface Votingmanabar {
    current_mana: string;
    last_update_time: number;
}
interface Owner {
    weight_threshold: number;
    account_auths: any[];
    key_auths: (number | string)[][];
}
interface Posting {
    weight_threshold: number;
    account_auths: (number | string)[][];
    key_auths: (number | string)[][];
}
export interface Profile {
    profile: ProfileObject;
  }
interface ProfileObject {
    profile_image: string;
    name: string;
    location: string;
    website: string;
    about: string;
    twitter: string;
    youtube: string;
    cover_image: string;
    ethereum: string;
}
```

## account.service.ts
```
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Account } from './account';
import { MessageService } from './message.service';
import { HiveBlog } from './hive-blog';
import {HiveAccount} from './hive-account';
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
getLoginImage(name:string): Observable<HiveAccount> {
  const body = {"jsonrpc":"2.0", "method":"database_api.find_accounts", "params": {"accounts":["loginname"]}, "id":1};
  const body2 = JSON.stringify(body).replace('loginname', `${name}`);
  const url = `${this.hiveBlogUrl}`; //const url = "https://api.hive.blog"; 
  console.log("Die url lautet: "+ url);
  console.log("Der Body vom Post lautet: " + JSON.stringify(body2));
  console.log("Die httpOptions sind: " + JSON.stringify(this.httpOptions));
//return this.http.post(url, body2, this.httpOptions)
return this.http.post<HiveAccount>(url, body2, this.httpOptions)
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

## account-detail.component.ts
```

import { Component, OnInit, Input } from '@angular/core';
import { Account } from '../account';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { AccountService } from '../account.service';
import { HiveBlog } from '../hive-blog';
import { Observable } from 'rxjs';
import { HiveAccount, Profile } from '../hive-account';
@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.css']
})
export class AccountDetailComponent implements OnInit {
  account: Account | undefined;
  hiveBlog: HiveBlog | undefined;
  hiveAccount: HiveAccount | undefined;
  profile: Profile | undefined;
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
  setLogindate(): void {
    if (this.account) {
      {
        if (this.hiveBlog) { this.account.logindate = new Date(this.hiveBlog.result[0].created);
        this.getLoginImage(); // Call the next part in the pipe
        }
      }
    }
  }
  
  getLoginImage(): void {
    if (this.account) {
      this.accountService.getLoginImage(this.account.name)
        //.subscribe(() => this.goBack());
        .subscribe((xxx) => {
          this.hiveAccount = (xxx);
          console.log('this.hiveBlog: ', this.hiveBlog);
          this.setLoginImage();
        });
    }
  }
  setLoginImage(): void {
    if (this.account) {
      if (this.hiveAccount) {
        console.log('this.hiveAccount: ', this.hiveAccount);
        this.profile = JSON.parse(this.hiveAccount.result.accounts[0].json_metadata);
        if (this.profile) {
          this.account.profileImage = this.profile.profile.profile_image;
          this.account.about=this.profile.profile.about;
          console.log('this.profile: ', this.profile);
          console.log('this.profile.image: ', this.profile.profile.profile_image);
          console.log('JSON Stringify this.profile: ', JSON.stringify(this.profile));
          console.log('this.hiveAccount.json_metadata...: ', this.hiveAccount.result.accounts[0].json_metadata);
          console.log('JSON Stringify this.hiveAccount.json_metadata...: ', JSON.stringify(this.hiveAccount.result.accounts[0].json_metadata));
        }
      }
    }
  }
  
}

```


## dashboard.component.ts
```

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
  account: Account = JSON.parse('{"id":"0","name":"","nickname":"","logindate":"2000-01-01T00:00:00.000Z"}');
  selectedAccount: any //Account = this.account;
  findState: string = "init";
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
    this.findState="init";
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
          this.findState="found";
        }
        catch {
          console.log("There was no account ID found")
          this.findState="notfound";
        }
     // Here this.findstate is either "found" or "not found" - so in html there is from this point on no longer findState="init"
 
        
      });
  }
}

```


## dashboard.component.html
```

<header class="masthead" id="#page-top">
  <div class="container px-4 px-lg-5 d-flex h-100 align-items-center justify-content-center">
    <div class="d-flex justify-content-center">
      <div class="text-center">
        <h3> Rules:</h3>
        <p>You are the King of a nation, that needs food and health. Care for it and it will grow and bring you lots of
          honour.</p>
        <p>When you login with your Hive-Name, you can get some good benefits to help your folk. But you can also use
          another name.</p>
        <p>This is Version 0.1 of Hammurabi - Later, with Version 1.0, you can win some coins on Hive, when you are
          good.</p>
        <br>
        <div class="text-center" *ngIf="account">
          <p> Please type in your name for this game: </p>
          <label for="account-name">Name: </label>
          <input id="account-name" [(ngModel)]="account.name" placeholder="name">
          <button class="button" type="button" (click)="findID()">Find Game-ID</button>
          <div *ngIf="findState==='found'">
            <div *ngIf="selectedAccount.id">
              <p>Welcome: {{account.name}}. Your Game ID is: {{account.id}}</p>
            </div>
            <a routerLink="/game/{{account.id}}">
              <button class="button" type="button">Start Game</button>
            </a>
          </div>
          <div *ngIf="findState==='notfound'">
            <p> This user is new. If you want to play with a new user click on "new Player"</p>
            
          </div>
          <p> Play with a new account: </p>
          <a class="nav-link" routerLink="/detail/0">
            <span class="badge">New Player</span>
          </a>
          <p>Or search for an existing account:  </p>
          <nav>
          <a class="nav-link" routerLink="/accounts">Accounts</a>
        </nav> 
        </div>



        <!--
      <ul class="accounts-menu">
        <a *ngFor="let number of [].constructor(5), let x = index">
          {{accounts[0].content[x].name}}
        </a>
      </ul>

              <div class="text-center" *ngFor="let number of accounts[0].content, let x = index">
        id: {{accounts[0].content[x].id}}
        name: {{accounts[0].content[x].name}}
        nickname: {{accounts[0].content[x].nickname}}
        logindate: {{accounts[0].content[x].logindate}}
      </div>
    -->
     
      </div>

    </div>
  </div>


  <ng-template #notFound>
    <h1>No User with this name</h1>
  </ng-template>
  <p> Ende</p>
</header>

```


## game.component.ts
```

import { Component, OnInit } from '@angular/core';
import { Account } from '../account';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from '../account.service';
import { Location } from '@angular/common';
import { HiveAccount, Profile } from '../hive-account';
import { HiveBlog } from '../hive-blog';
import { Round } from '../round';
//import {Controller} from '@angular/common'
//import {angular} from"https://ajax.googleapis.com/ajax/libs/angularjs/1.6.9/angular.min.js";
@Component({
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  hiveAccount: HiveAccount | undefined;
  profile: Profile | undefined;
  account: Account | undefined;
  hiveBlog: HiveBlog | undefined;
  roundzero: Round = JSON.parse('{"year":0,"food":100,"population":100,"treasure":0,"health":100,"taxrate":0,"happiness":100, "production":100}');
  roundnow: Round
  rounds: Round[] = [this.roundzero];
  year = 0;
  addFood = 0;
  landmass = 10000;
  levelFaktor = 1.02;
  tooExpensive = false;
  value = '';
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private accountService: AccountService) {
    this.roundnow = this.roundzero;
  }
  ngOnInit(): void {
    this.getAccount();
    this.playgRound();
  }
  getAccount(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.accountService.getAccount(id)
      .subscribe(account => {
        this.account = account;
        this.getLoginImage();
      });
  }
  goBack(): void {
    this.location.back();
  }
  getLoginImage(): void {
    if (this.account) {
      this.accountService.getLoginImage(this.account.name)
        //.subscribe(() => this.goBack());
        .subscribe((xxx) => {
          this.hiveAccount = (xxx);
          console.log('this.hiveBlog: ', this.hiveBlog);
          this.setLoginImage();
        });
    }
  }
  setLoginImage(): void {
    if (this.account) {
      if (this.hiveAccount) {
        console.log('this.hiveAccount: ', this.hiveAccount);
        this.profile = JSON.parse(this.hiveAccount.result.accounts[0].json_metadata);
        if (this.profile) {
          this.account.profileImage = this.profile.profile.profile_image;
          this.account.about = this.profile.profile.about;
          console.log('this.profile: ', this.profile);
          console.log('this.profile.image: ', this.profile.profile.profile_image);
          console.log('JSON Stringify this.profile: ', JSON.stringify(this.profile));
          console.log('this.hiveAccount.json_metadata...: ', this.hiveAccount.result.accounts[0].json_metadata);
          console.log('JSON Stringify this.hiveAccount.json_metadata...: ', JSON.stringify(this.hiveAccount.result.accounts[0].json_metadata));
        }
      }
    }
  }
  playgRound(): void {
    var f1, f2, f3, p0, p1, p2, p3, h1, h2, pop1, pop2, pop3, t1, t2;
  
    
    this.year++;
    //    this.rounds[0]=this.roundzero
    console.log("letztes Jahr war:", this.year - 1);
    console.log("Dieses Jahr ist:", this.year);
    this.roundnow.year = this.year;
  //Treasure
  t1 = Number(this.rounds[this.year - 1].treasure + this.rounds[this.year - 1].taxrate) - this.addFood;  
  this.roundnow.treasure = t1 * this.rounds[this.year - 1].production / 100 ;
  console.log("addfood, t1, t2 + Treasure: ", this.addFood, t1, t2, this.roundnow.treasure)
  this.addFood=0;
    // production and population influences food
    f1 = 1;
    f2 = f1 * 100 / this.rounds[this.year - 1].population;
    f3 = f2 * this.rounds[this.year - 1].production
    this.roundnow.food = f3 * this.levelFaktor / (f3 / this.landmass + 1) + Number(this.addFood) * 100 / this.rounds[this.year - 1].population;


    //food and landmass influences population:
    pop1 = this.rounds[this.year - 1].population;
    pop3 = pop1 / (pop1 / this.landmass + 1)// + this.rounds[0].population  //asymptote between pop1 and landmass
    this.roundnow.population = pop3 * this.rounds[this.year - 1].food / 100;
    console.log("pop1, pop2, pop3 + population: ", pop1, pop2, pop3, this.roundnow.population)
    this.roundnow.taxrate = this.rounds[this.year - 1].taxrate;
    //taxrate and food influences happiness:
    h1 = this.rounds[this.year - 1].happiness / 100;
    //h2=h1*(100-h1*this.rounds[this.year - 1].taxrate) 
    h2 = 100 - h1 * this.rounds[this.year - 1].taxrate
    this.roundnow.happiness = h2 / 100 * this.rounds[this.year - 1].food

    this.checkTreasure() ;

    //happiness and landmass and population influences production:
    p1 = this.rounds[this.year - 1].production / 100;
    p2 = p1 * this.rounds[this.year - 1].happiness / 100;
    //p3=this.landmass - this.landmass*p0/(p1*p2) + p0;  //asymptote between pop1 and landmass
    p3 = p2 / (p2 / this.landmass + 1)//+this.rounds[0].production //asymptote between p2 and landmass
    this.roundnow.production = p3 * this.rounds[this.year - 1].population;
    this.rounds.push({
      year: this.roundnow.year,
      food: this.roundnow.food,
      health: this.roundnow.health,
      population: this.roundnow.population,
      taxrate: this.roundnow.taxrate,
      treasure: this.roundnow.treasure,
      happiness: this.roundnow.happiness,
      production: this.roundnow.production
    })
    console.log("Diese Runde (this rounds):", JSON.stringify(this.rounds[this.year]));
    console.log("Diese Runde (this roundnow):", JSON.stringify(this.roundnow));
    console.log("Vorrunde: ", JSON.stringify(this.rounds[this.year - 1]))
    console.log("Runden: ", this.rounds)
    console.log("Runde 1: ", JSON.stringify(this.rounds[1]))
  }
  checkTreasure() {
    if (this.addFood > this.roundnow.treasure) { this.tooExpensive = true }
    else {
      this.tooExpensive = false;
    }
  }
  update(value: string) { this.value = value; }
  onKey(event: KeyboardEvent) { // with type info
    this.addFood=Number((event.target as HTMLInputElement).value);
    //this.value += (event.target as HTMLInputElement).value + ' | ';
    
    this.checkTreasure();
  }
}

```


## game.component.html
```

<header class="masthead">
  <div class="container px-4 px-lg-5 d-flex h-100 align-items-center justify-content-center">
    <div class="d-flex justify-content-center">
      <div class="text-center" *ngIf="account">
        <h2>The Game</h2>
        <p>Dear {{account.name}}. You are King Hammurabi.
          <img src={{account.profileImage}} height="100" width="100" alt="Hive-Profile" hspace="50" vspace="50">
        </p>
        <p>Your Account.id is: {{account.id}}</p>
        <p>Your banner is: {{account.about}}</p>
        <div>
          this.year = {{year}}
          <p>Year: {{rounds[year].year}}</p>
          <p>Population: {{rounds[year].population}}</p>
          <p>Foodrate: {{rounds[year].food}}%</p>
          <p>Treasure: {{rounds[year].treasure}}</p>
          <p>Taxrate (influences Treasure + happiness): {{roundnow.taxrate}}</p>
          <p>Happiness: {{roundnow.happiness}}</p>
          <p>production: {{roundnow.production}}</p>
          <p> Please type in your taxrate for the next year: </p>
          <label for="taxrate">Taxrate: </label>
          <input id="taxrate" [(ngModel)]="rounds[year].taxrate" placeholder="tax your people" type="number">
          <label for="Food">Buy Food: </label>


          <input #box  id="Food" placeholder="Buy food for the people" name="addfood" (keyup)="0" (keyup)="onKey($event)"
           (keyup.enter)="checkTreasure()" (blur)="checkTreasure()" [(ngModel)]="addFood">
          <p> addFood= {{addFood}}</p>
          <!--
          <input (keyup)="onKey($event)">
          <p>{{value}}</p>
          <h4>Type away! Press [enter] when done.</h4>
          <div>
            <input #box
            (keyup.enter)="update(box.value)"
            (blur)="update(box.value)">
      
          <p>Value = {{value}}</p>
        
          </div>
  -->
          <p>Taxrate: {{rounds[year].taxrate}} Food: {{addFood}} </p>
          <div class="text-center" *ngIf="tooExpensive; then zuTeuer; else elseRounds">
          </div>
          <ng-template #zuTeuer>
            <p> You cannot affort that amount of food!</p>
          </ng-template>
          <ng-template #elseRounds>
            <div class="text-center" *ngIf="rounds[year]">
              <div *ngIf="year < 15 && rounds[year].population>1; then thenTemplate; else elseTemplate">
              </div>
              <ng-template #thenTemplate>
                <button class="button" type="button" title="next year" (click)="playgRound()" > next year</button>
              </ng-template>
              <ng-template #elseTemplate>
                Game over
              </ng-template>
            </div>
          </ng-template>

        </div>
      </div>
    </div>
  </div>
</header>

```






