import { Component, OnInit } from '@angular/core';
import { Account } from '../account';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from '../account.service';
import { Location } from '@angular/common';

@Component({
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  account: Account | undefined;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private accountService: AccountService) { }

  ngOnInit(): void {
    this.getAccount();
  }

  getAccount(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.accountService.getAccount(id)
      .subscribe(account => this.account = account);
  }

  goBack(): void {
    this.location.back();
  }

}
