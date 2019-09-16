import { Component, OnInit } from '@angular/core';
import { FdjService } from './../fdj.service';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute, Params, ParamMap } from '@angular/router';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {

  strLeague;
  teams: any;

  constructor(
    private fdjSrv: FdjService,
    private location: Location,
    private route: ActivatedRoute) { }

  ngOnInit() {

    this.teams = this.fdjSrv.accessActualLeague().pipe(switchMap((value) => {
      return this.fdjSrv.getTeamsInALeague(value);
    }));

    // this.teams = this.route.params.pipe(switchMap((param: ParamMap) => {
      // return this.fdjSrv.getTeamsInALeague(param['strLeague']);
    // }));
  }

  goBack(): void {
    this.location.back();
  }

}
