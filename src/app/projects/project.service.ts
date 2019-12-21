import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { ProjectModel } from './project.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class ProjectService {
  projectsChanged = new Subject<ProjectModel[]>();

  private projects: ProjectModel[] = [];

  constructor(private slService: ShoppingListService) {}

  setProjects(projects: ProjectModel[]) {
    this.projects = projects;
    this.projectsChanged.next(this.projects.slice());
  }

  getProjects() {
    return this.projects.slice();
  }

  getProject(index: number) {
    return this.projects[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  addProject(project: ProjectModel) {
    this.projects.push(project);
    this.projectsChanged.next(this.projects.slice());
  }

  updateProject(index: number, newProject: ProjectModel) {
    this.projects[index] = newProject;
    this.projectsChanged.next(this.projects.slice());
  }

  deleteProject(index: number) {
    this.projects.splice(index, 1);
    this.projectsChanged.next(this.projects.slice());
  }
}
