import { Component, OnInit } from '@angular/core';
import { FdjService } from './../fdj.service';
import { FormControl} from '@angular/forms';
import { Observable} from 'rxjs';
import { map, startWith} from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-championnat',
  templateUrl: './championnat.component.html',
  styleUrls: ['./championnat.component.css']
})
export class ChampionnatComponent implements OnInit {

  leagueCtrl = new FormControl();
  filteredLeagues: Observable<any[]>;
  strLeague: string;
  leagues = [];
  logo = './assets/logo.png';
  teams: any;
  showTeams = false;

  constructor(
    private fdjSrv: FdjService,
    private route: Router)
  {
    this.filteredLeagues = this.leagueCtrl.valueChanges
    .pipe(
      startWith(''),
      // map(league => league ? this._filterLeagues(league) : this.leagues.slice())
      map((league) => {
          if (league) {
            if (league.strLeague) {
              console.log(league);
            }
            // if (league) {
            //   console.log(league);
            // }
            // this.fdjSrv.getTeamsInALeague(league).subscribe(
            //   (data) => {
            //     this.teams = data ? data : [];
            //   }
            // }
            // this.showTeams = true;
            return this._filterLeagues(league);
          } else {
            return this.leagues.slice();
          }
      })
    );
  }

  ngOnInit() {
    this.fdjSrv.getAllLeagues().subscribe((league) => {
      this.leagues = league;
    });
  }

  private _filterLeagues(value: any): any[] {
    const filterValue = value.toLowerCase();
    return this.leagues.filter(league => league.strLeague.toLowerCase().indexOf(filterValue) === 0);
  }
}
