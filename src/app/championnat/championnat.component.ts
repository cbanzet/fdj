import { Component, OnInit } from '@angular/core';
import { FdjService } from './../fdj.service';
import { FormControl} from '@angular/forms';
import { Observable} from 'rxjs';
import { map, startWith} from 'rxjs/operators';
import { Router } from '@angular/router';
import { League } from './league.model';

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
    private route: Router) {
      this.filteredLeagues = this.leagueCtrl.valueChanges
      .pipe(
        startWith(''),
        map((value) => {
          if (typeof value === 'string') {
            return value;
          } else {
            this.route.navigate(['/teams/' + value.strLeague]);
            return value.strLeague;
          }
        }),
        map(league => league ? this._filterLeagues(league) : this.leagues.slice())
    );
  }

  displayFn(league?: League): string | undefined {
    return league ? league.strLeague : undefined;
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
