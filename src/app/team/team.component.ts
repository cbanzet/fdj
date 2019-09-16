import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';
import { Router, ActivatedRoute, Params, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { FdjService } from './../fdj.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  strTeam: string;
  strTeamBadge: string;
  team: Observable<any>;
  players: any;

  constructor(
    private fdjSrv: FdjService,
    private location: Location,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => { this.strTeam = params['strTeam']; });
    this.route.params.subscribe((params: Params) => { this.strTeamBadge = params['strTeamBadge']; });

    this.players = this.route.params.pipe(switchMap((param: ParamMap) => {
      return this.fdjSrv.getPlayersInATeam(param['teamid']);
    }));
  }

  goBack(): void {
    this.location.back();
  }

}
