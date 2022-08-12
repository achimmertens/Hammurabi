import { Component, OnInit } from '@angular/core';
import { Account } from '../account';

@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.css']
})
export class AccountDetailComponent implements OnInit {
  
  account: Account | undefined;

  constructor() { 

  }

  ngOnInit(): void {
  
  }

}
