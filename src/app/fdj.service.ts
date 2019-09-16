import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { League } from './championnat/league.model';
import { Teams } from './teams/teams.model';

@Injectable({
  providedIn: 'root'
})
export class FdjService {

  apiLeagues = 'https://www.thesportsdb.com/api/v1/json/1/all_leagues.php';
  apiTeams = 'https://www.thesportsdb.com/api/v1/json/1/search_all_teams.php?l=';
  apiTeamPlayers = 'https://www.thesportsdb.com/api/v1/json/1/lookup_all_players.php?id=';

  allLeagues = [];
  strLeagueUrl: string;
  teams: any;
  players: any;

  private strLeague = new Subject<string>();
  private leagueTeams = new Subject<Teams[]>();

  // strLeague$ = this.strLeague.asObservable();
  // leagueTeams$ = this.leagueTeams.asObservable();

  constructor(private httpclient: HttpClient) { }

  getLeague(strLeague): Observable<any> {
    return this.httpclient.get(`${this.apiTeams}${name}`);
  }

  getAllLeagues(): Observable<League[]> {
    return this.httpclient.get(this.apiLeagues)
      .pipe(
        map((data: any) => {
          return data.leagues;
        }),
        map((data) => {
          this.allLeagues.push(data);
          return this.allLeagues[0];
        })
      );
  }

  strLeagueUpdate(strLeague) {
    this.strLeague.next(strLeague);
  }

  accessActualLeague() {
    return this.strLeague.asObservable();
  }





  getLeagueTeamsListener() {
    return this.leagueTeams.asObservable();
  }
  updateLeague(strLeague: string) {
    this.leagueTeams$ = this.httpclient.get(`${this.apiTeams}${strLeague}`)
      .pipe(map((data: any) => {
        return data.teams;
      })
    );
  }


  getAllTeams() {
    return this.httpclient.get(this.apiTeams)
      .pipe(map((data: any) => {
          return data.teams;
        })
      );
  }

  getTeamsInALeague(name: string): Observable<any[]>  {
    this.teams = this.httpclient.get(`${this.apiTeams}${name}`)
    .pipe(map((data: any) => {
      return data.teams;
    }));
    return this.teams;
  }

  getPlayersInATeam(id: number): Observable<any[]> {
    this.players = this.httpclient.get(`${this.apiTeamPlayers}${id}`)
    .pipe(map((data: any) => {
      return data.player;
    }));
    return this.players;
  }

}
