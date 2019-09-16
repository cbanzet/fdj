import { Component, OnInit, Input } from '@angular/core';
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

  strLeague: string;
  teams: any;

  constructor(
    private fdjSrv: FdjService,
    private location: Location,
    private route: ActivatedRoute) { }

  ngOnInit() {
    // this.route.params.subscribe((params: Params) => {
    //   this.teams =  this.fdjSrv.getTeamsInALeague(params['strLeague']);
    // });
    this.teams = this.route.params.pipe(switchMap((param: ParamMap) => {
      return this.fdjSrv.getTeamsInALeague(param['strLeague']);
    }));
  }

  goBack(): void {
    this.location.back();
  }

}
