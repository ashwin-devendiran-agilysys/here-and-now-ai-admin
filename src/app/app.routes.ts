
import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { ParticipantsListComponent } from './features/participants/components/participants-list.component';
import { ParticipantFormComponent } from './features/participants/components/participant-form.component';
import { ApiTestComponent } from './debug/api-test.component';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'participants', component: ParticipantsListComponent },
  { path: 'participants/new', component: ParticipantFormComponent },
  { path: 'participants/:id', component: ParticipantFormComponent },
  { path: 'participants/:id/edit', component: ParticipantFormComponent },
  { path: 'api-test', component: ApiTestComponent }
];