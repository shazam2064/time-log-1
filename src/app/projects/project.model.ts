import { TaskModel } from '../shared/task.model';

export class ProjectModel {
  public name: string;
  public description: string;
  public imagePath: string;
  public tasks: TaskModel[];

  constructor(name: string, desc: string, imagePath: string, ingredients: TaskModel[]) {
    this.name = name;
    this.description = desc;
    this.imagePath = imagePath;
    this.tasks = ingredients;
  }
}
