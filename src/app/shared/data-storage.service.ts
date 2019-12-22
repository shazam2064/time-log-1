import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

import { ProjectModel } from "../projects/project.model";
import { ProjectService } from "../projects/project.service";

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(private http: HttpClient, private projectService: ProjectService) {}

  storeProjects() {
    const projects = this.projectService.getProjects();
    this.http
      .put(
        'https://ng-course-recipe-book-56390.firebaseio.com/projects.json',
        projects
      )
      .subscribe(response => {
        console.log(response);
      });
  }

  fetchProjects() {
    return this.http
      .get<ProjectModel[]>(
        'https://ng-course-recipe-book-56390.firebaseio.com/projects.json'
  )
      .pipe(
        map(projects => {
          return projects.map(project => {
            return {
              ...project,
              ingredients: project.tasks ? project.tasks : []
            };
          });
        }),
        tap(projects => {
          this.projectService.setProjects(projects);
        })
      )
  }
}
