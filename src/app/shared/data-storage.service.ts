import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, tap, take, exhaustMap } from 'rxjs/operators';

import { ProjectModel } from '../projects/project.model';
import { ProjectService } from '../projects/project.service';
import { AuthService } from '../auth/auth.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private projectService: ProjectService,
    private authService: AuthService
  ) {}

  storeProjects() {
    const recipes = this.projectService.getProjects();
    this.http
      .put(
        'https://ng-course-recipe-book-56390.firebaseio.com/recipes.json',
        recipes
      )
      .subscribe(response => {
        console.log(response);
      });
  }

  fetchProjects() {
    return this.authService.user.pipe(
      take(1),
      exhaustMap(user => {
        return this.http.get<ProjectModel[]>(
          'https://ng-course-recipe-book-56390.firebaseio.com/recipes.json',
          {
            params: new HttpParams().set('auth', user.token)
          }
        );
      }),
      map(projects => {
        return projects.map(project => {
          return {
            ...project,
            tasks: project.tasks ? project.tasks : []
          };
        });
      }),
      tap(projects => {
        this.projectService.setProjects(projects);
      })
    );
  }
}
