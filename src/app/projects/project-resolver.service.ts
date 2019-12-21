import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

import { ProjectModel } from './project.model';
import { DataStorageService } from '../shared/data-storage.service';
import { ProjectService } from './project.service';

@Injectable({ providedIn: 'root' })
export class ProjectResolverService implements Resolve<ProjectModel[]> {
  constructor(
    private dataStorageService: DataStorageService,
    private projectService: ProjectService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const projects = this.projectService.getProjects();

    if (projects.length === 0) {
      return this.dataStorageService.fetchProjects();
    } else {
      return projects;
    }
  }
}
