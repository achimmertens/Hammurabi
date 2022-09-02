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

  getLogindate(): void {
    if (this.account) {
      this.accountService.getLogindate(this.account.name)
        .subscribe(() => this.goBack());
    }
  }
}
