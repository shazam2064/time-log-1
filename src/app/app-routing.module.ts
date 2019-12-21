import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProjectComponent } from './projects/project.component';
import { TaskListComponent } from './task-list/task-list.component';
import { ProjectStartComponent } from './projects/project-start/project-start.component';
import { ProjectDetailComponent } from './projects/projects-detail/project-detail.component';
import { ProjectEditComponent } from './projects/project-edit/project-edit.component';
import { ProjectResolverService } from './projects/project-resolver.service';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';

const appRoutes: Routes = [
  { path: '', redirectTo: '/auth', pathMatch: 'full' },
  {
    path: 'projects',
    component: ProjectComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: ProjectStartComponent },
      { path: 'new', component: ProjectEditComponent },
      {
        path: ':id',
        component: ProjectDetailComponent,
        resolve: [ProjectResolverService]
      },
      {
        path: ':id/edit',
        component: ProjectEditComponent,
        resolve: [ProjectResolverService]
      }
    ]
  },
  { path: 'shopping-list', component: TaskListComponent },
  { path: 'auth', component: AuthComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
