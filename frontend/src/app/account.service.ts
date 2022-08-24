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

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' ,
    'Accept': '*/*'  
  })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    ) {  }

  /** GET accounts from the server */
  getAccounts(): Observable<Account[]> {
    //var content:Level1[]=[];
    var content:any;
     content=this.http.get<Account[]>(this.accountsUrl)
    .pipe(
      tap(_ => this.log('fetched accounts')),
      catchError(this.handleError<Account[]>('getAccounts', []))
    );
    this.log("Der Inhalt von content ist:"+JSON.stringify(content));

       return content;
  }
  getLevel1(): Observable<Level1[]> {
    //var content:Level1[]=[];
    var content:any;
    content=this.http.get<Level1[]>(this.accountsUrl)
    .pipe(
      tap(_ => this.log('fetched accounts')),
      catchError(this.handleError<Level1[]>('getLevel1', []))
    );
    this.log("Der Inhalt von Content ist:"+JSON.stringify(content));
    
    return JSON.parse(content[0]);
  }

  getAccount(id: number): Observable<Account> {
    const url = `${this.accountUrl}/${id}`;
    return this.http.get<Account>(url).pipe(
      tap(_ => this.log(`fetched account id=${id}`)),
      catchError(this.handleError<Account>(`getAccount id=${id}`))
    );
  }

//////// Save methods //////////

  /** POST: add a new account to the server */
  /*
  addAccount(account: Account): Observable<Account> {
    const url = `${this.accountUrl}/${account.id}`;
    return this.http.post<Account>(url, account, this.httpOptions).pipe(
      tap((newAccount: Account) => this.log(`added account w/ id=${newAccount.id}`)),
      catchError(this.handleError<Account>('addAccount'))
    );
  }
  addPerson(person:Person): Observable<any> {
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(person);
    console.log(body)
    return this.http.post(this.baseURL + 'people', body,{'headers':headers})
  }
  */

  addAccount(account:Account): Observable<any> {
    //const headers = { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Accept':'*/*'}  
    //const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    // 'Access-Control-Allow-Origin', '*', 'Accept':'*/*'); 
 

    var headers = new Headers({
      "Content-Type": "application/json",
      "Accept": "application/json"
  });
    const body=JSON.stringify(account);
    const url = `${this.accountUrl}`;
    console.log("Der Body vom Post lautet:"+body);
    return this.http.post(url, body,this.httpOptions)
    .pipe(
      catchError((err) => {
        console.error(err);
        throw err;
      }
    ))
  }


  /** DELETE: delete the account from the server */
  deleteAccount(id: number): Observable<Account> {
    const url = `${this.accountUrl}/${id}`;

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










  /*
  //accounts = ACCOUNTS;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  


  constructor(private messageService: MessageService, private http: HttpClient) { }

/*
  getAccounts(): Observable<Account[]> {
    const accounts = of(ACCOUNTS);
    this.messageService.add('AccountService: fetched accounts');
    return accounts;
  }
*/

/*
  getAccount(id: number): Observable<Account> {
    // For now, assume that a account with the specified `id` always exists.
    // Error handling will be added in the next step of the tutorial.
    const account = ACCOUNTS.find(h => h.id === id)!;
    this.messageService.add(`AccountService: fetched account id=${id}`);
    return of(account);
  }

  /** GET account by id. Return `undefined` when id not found 
  getAccount<Data>(id: number): Observable<Account> {
    const url = `${this.accountUrl}/?id=${id}`;
    return this.http.get<Account[]>(url)
      .pipe(
        map(accounts => accounts[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? 'fetched' : 'did not find';
          this.log(`${outcome} acount id=${id}`);
        }),
        catchError(this.handleError<Account>(`getAccount id=${id}`))
      );
  }

 
    /* Dies holt zumidest schon mal den JSON String vom Server, stellt ihn aber nicht dar:
  getAccounts(): Observable<any> {
    const accounts = of(this.http.get(this.accountsUrl, {responseType: 'json'}));
  return accounts;
} 


getAccounts(): Observable<Account[]> {
  return this.http.get<Account[]>(this.accountsUrl)
    .pipe(
      tap(_ => this.log('fetched accounts')),
      catchError(this.handleError<Account[]>('getAccounts', []))
    );
}



getTextMsg(): Observable<string> {
  return this.http.get(this.accountsUrl, { responseType: 'text' });
}
//  getWriterWithFavBooks(): Observable<any> {
//    return this.http.get(this.accountsUrl);
//} 



/*
getAccounts (): Observable<Account[]>{
  const accounts = of(ACCOUNTS);
 // const ACCOUNTS: Account[]=[
 //   {id:1, name:"Achim Mertens", nickname:"Greensniper",logindate: new Date('2022-08-11T11:08:47.884Z')},
 //   {id:2, name:"Annette Mertens", nickname:"Schnuffel",logindate: new Date('2022-08-11T11:08:47.884Z')}
//]
  return accounts;


  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   
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

  /** Log a AccountService message with the MessageService 
  private log(message: string) {
    this.messageService.add(`AccountService: ${message}`);
  }
}
*/
  


