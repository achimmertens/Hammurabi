import { Component, OnInit } from '@angular/core';
import { Account } from '../account';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from '../account.service';
import { Location } from '@angular/common';
import { HiveAccount, Profile } from '../hive-account';
import { HiveBlog } from '../hive-blog';
import { Round} from '../round';

@Component({
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  hiveAccount: HiveAccount | undefined;
  profile: Profile | undefined;
  account: Account | undefined;
  hiveBlog: HiveBlog | undefined;
  roundzero: Round = JSON.parse('{"year":0,"food":100,"population":100,"treasure":0,"health":100,"taxrate":0,"happiness":100, "production":100}');
  roundnow: Round 
  rounds: Round[] = [this.roundzero];
  year = 0;
  addFood=0;
  landmass=10000;
  levelFaktor=1.00;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private accountService: AccountService) {
    this.roundnow = this.roundzero;
  }

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

  playgRound(): void {
    var f1,f2,f3,p0,p1,p2,p3,h1,h2,pop1,pop2,pop3,t1,t2; 
    
    this.year++;
    //    this.rounds[0]=this.roundzero
    console.log("letztes Jahr war:", this.year - 1);
    console.log("Dieses Jahr ist:", this.year);
    // this.rounds[this.year] = this.rounds[this.year - 1];  //Hier ist der Hund begraben. Es wird das komplette Array überschrieben
    this.roundnow.year = this.year;

    // production and population influences food
    f1=1;
    f2=f1*100/this.rounds[this.year - 1].population;
    f3=f2*this.rounds[this.year - 1].production
    this.roundnow.food=f3*this.levelFaktor/(f3/this.landmass+1)+Number(this.addFood)*100/this.rounds[this.year - 1].population; 
    this.addFood=0;
  

    //food and landmass influences population:
    pop1=this.rounds[this.year - 1].population;
    pop3=pop1/(pop1/this.landmass+1)// + this.rounds[0].population  //asymptote between pop1 and landmass
    this.roundnow.population=pop3*this.rounds[this.year - 1].food/100; 
    console.log("pop1, pop2, pop3 + population: ",pop1,pop2,pop3, this.roundnow.population)

    this.roundnow.taxrate = this.rounds[this.year - 1].taxrate;
    //taxrate and food influences happiness:
    h1=this.rounds[this.year - 1].happiness/100;
    //h2=h1*(100-h1*this.rounds[this.year - 1].taxrate) 
    h2=100-h1*this.rounds[this.year - 1].taxrate
    this.roundnow.happiness=h2/100*this.rounds[this.year-1].food

    
   //taxrate and production influences treasure:
   //if(this.rounds[this.year].taxrate){
    t1 = Number(this.rounds[this.year - 1].treasure + this.rounds[this.year-1].taxrate);  //todo
    this.roundnow.treasure=t1*this.rounds[this.year-1].production/100
    console.log("t1, t2 + Treasure: ",t1,t2,this.roundnow.treasure)
   //}

    //happiness and landmass and population influences production:
    //p0=this.rounds[0].production*this.rounds[0].happiness/100;
    p1=this.rounds[this.year - 1].production/100;  
    p2=p1*this.rounds[this.year - 1].happiness/100;
    //p3=this.landmass - this.landmass*p0/(p1*p2) + p0;  //asymptote between pop1 and landmass
    p3=p2/(p2/this.landmass+1)//+this.rounds[0].production //asymptote between p2 and landmass
    //pop2=pop1/(pop1/this.landmass+1) + this.rounds[0].population  //asymptote between pop1 and landmass
    this.roundnow.production=p3*this.rounds[this.year - 1].population; 

    this.rounds.push({
      year: this.roundnow.year,
      food: this.roundnow.food,
      health: this.roundnow.health,
      population: this.roundnow.population,
      taxrate: this.roundnow.taxrate,
      treasure: this.roundnow.treasure,
      happiness: this.roundnow.happiness,
      production: this.roundnow.production
    })
    console.log("Diese Runde (this rounds):", JSON.stringify(this.rounds[this.year]));
    console.log("Diese Runde (this roundnow):", JSON.stringify(this.roundnow));
    console.log("Vorrunde: ", JSON.stringify(this.rounds[this.year - 1]))
    console.log("Runden: ", this.rounds)
    console.log("Runde 1: ", JSON.stringify(this.rounds[1]))
  }


}
