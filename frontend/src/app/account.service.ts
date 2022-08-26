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
    //var content:Level1[]=[];
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