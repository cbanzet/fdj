import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChampionnatComponent } from './championnat/championnat.component';
import { TeamsComponent } from './teams/teams.component';
import { TeamComponent } from './team/team.component';

const routes: Routes = [
  { path: 'leagues', component: ChampionnatComponent },
  { path: 'teams/:strLeague', component: TeamsComponent, data: { animation: 'isLeft'} },
  { path: 'team/:teamid/:strTeam/:strTeamBadge', component: TeamComponent, data: {animation: 'isRight' } },
  { path: '', component: ChampionnatComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
