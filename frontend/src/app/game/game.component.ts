import { Component, OnInit } from '@angular/core';
import { Account } from '../account';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from '../account.service';
import { Location } from '@angular/common';
import { HiveAccount, Profile } from '../hive-account';
import { HiveBlog } from '../hive-blog';
import { Round } from '../round';

@Component({
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  hiveAccount: HiveAccount | undefined;
  profile: Profile | undefined;
  account: Account | undefined;
  hiveBlog: HiveBlog | undefined;
  //round: Round | undefined;
  //account: Account = JSON.parse('{"id":"0","name":"","nickname":"","logindate":"2000-01-01T00:00:00.000Z"}');
/*
    year: number,
    foot: number
    population: number,
    treasure: number,
    health: number,
    taxrate: number
*/
  round: Round = JSON.parse('{"year":0,"foot":0,"population":100,"treasure":100,"health":100,"taxrate":0}');
  rounds: Round[]=[];

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private accountService: AccountService) { }

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

  playgRound(): void{
    this.rounds[0]=this.round;
    console.log("Runde 0:", this.rounds[0]);
    console.log("Runden: ", this.rounds)

  }



}
