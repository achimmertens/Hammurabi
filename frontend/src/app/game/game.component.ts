import { Component, OnInit } from '@angular/core';
import { Account } from '../account';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from '../account.service';
import { Location } from '@angular/common';
import { HiveAccount, Profile } from '../hive-account';
import { HiveBlog } from '../hive-blog';
import { Round, Test } from '../round';

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
      food: number
      population: number,
      treasure: number,
      health: number,
      taxrate: number
  */
  roundzero: Round = JSON.parse('{"year":0,"food":100,"population":100,"treasure":100,"health":100,"taxrate":0}');
  //rounds: Round[] = [];
  //fruits: string[] = ['Kiwi', 'Plums', 'Peaches', 'Apples', 'Lime', 'Cherries'];
  roundnow: Round=this.roundzero;
  rounds: Round[] = [this.roundzero];
  //Test: { a: number} | any
  testzero:Test =  JSON.parse('{"a":0}');
  //tests: Test[]=[this.testzero];
  tests: Test[]=[];
  year = 0;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private accountService: AccountService) {
      this.tests[0]=this.testzero;
      this.tests[1]=this.testzero;
     }

  ngOnInit(): void {
    this.getAccount();
    this.playgRound();
    //this.dishService.getDishIds().subscribe(dishIds => this.dishIds);
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

  playgRound(): void {
    var x;
    this.year++;
//    this.rounds[0]=this.roundzero
    console.log("letztes Jahr war:", this.year - 1);
    console.log("Dieses Jahr ist:", this.year);
   // this.rounds[this.year] = this.rounds[this.year - 1];  //Hier ist der Hund begraben
    //this.rounds[this.year] = this.round;
    
      this.roundnow.year = this.year;
      
    this.roundnow.food = this.rounds[this.year - 1].food + 2;
    
    this.roundnow.health = this.rounds[this.year - 1].health;
    this.roundnow.population = this.rounds[this.year - 1].population + 2;
    this.roundnow.taxrate = this.rounds[this.year - 1].taxrate;
    this.roundnow.treasure = this.rounds[this.year - 1].treasure-3;


    this.rounds.push({
      year: this.roundnow.year,
      food: this.roundnow.food,
      health: this.roundnow.health,
      population: this.roundnow.population,
      taxrate: this.roundnow.taxrate,
      treasure: this.roundnow.treasure
    })
    //[this.year].food=this.rounds[this.year-1].food+5
    this.tests[0]=this.testzero;
    console.log("tests[0]:", this.tests[0])
    console.log("tests[0].a:", this.tests[0].a)
    x=this.tests[this.year-1].a+2
    console.log("tests[letztes Jahr].a+2:", x)
    
   //this.rowData.push({    key+i : val+1  });
   this.tests.push({a:x, b:2})
    //this.tests[this.year].a =x;
    console.log("tests[dieses Jahr].a:", this.tests[this.year].a)
    console.log("Diese Runde (this rounds):", JSON.stringify(this.rounds[this.year]));
    console.log("Diese Runde (this roundnow):", JSON.stringify(this.roundnow));
    console.log("Vorrunde: ",JSON.stringify(this.rounds[this.year-1]))
    console.log("Runden: ", this.rounds)
    console.log("Runde 1: ",JSON.stringify(this.rounds[1]))
   

    console.log("Tests:", this.tests)
  
  }



}
