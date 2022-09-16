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