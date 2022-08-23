import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Account } from './account';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private accountsUrl = "http://192.168.2.121:8080/api/accounts"
  private accountUrl = "http://192.168.2.121:8080/api/account"

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET accounts from the server */
  getAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(this.accountsUrl)
      .pipe(
        tap(_ => this.log('fetched accounts')),
        catchError(this.handleError<Account[]>('getAccounts', []))
      );
  }

  getAccount(id: number): Observable<Account> {
    const url = `${this.accountUrl}/${id}`;
    return this.http.get<Account>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Account>(`getAccount id=${id}`))
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
  


