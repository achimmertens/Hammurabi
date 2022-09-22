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
          this.account.profileImage = this.profile.profile_image;
          console.log('this.profile: ', this.profile);
          console.log('JSON Stringify this.profile: ', JSON.stringify(this.profile));
          console.log('this.hiveAccount.json_metadata...: ', this.hiveAccount.result.accounts[0].json_metadata);
          console.log('JSON Stringify this.hiveAccount.json_metadata...: ', JSON.stringify(this.hiveAccount.result.accounts[0].json_metadata));
        }

      }
    }
  }

}