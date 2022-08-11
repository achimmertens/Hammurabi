import { Component, OnInit } from '@angular/core';
import {Account} from '../account';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {
  account: Account = {
    id: 1,
    name: "Achim",
    nickname: "Greensniper",
    logindate: new Date('1997-07-16')
  }

  constructor() { }

  ngOnInit(): void {
  }

}
