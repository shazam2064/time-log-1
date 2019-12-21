import { TaskModel } from '../shared/task.model';
import { Subject } from 'rxjs';

export class TaskListService {
  ingredientsChanged = new Subject<TaskModel[]>();
  startedEditing = new Subject<number>();
  private tasks: TaskModel[] = [
    new TaskModel('Set the date and hour', 5),
    new TaskModel('Fix calendar options', 10),
  ];

  getIngredients() {
    return this.tasks.slice();
  }

  getIngredient(index: number) {
    return this.tasks[index];
  }

  addIngredient(ingredient: TaskModel) {
    this.tasks.push(ingredient);
    this.ingredientsChanged.next(this.tasks.slice());
  }

  addIngredients(ingredients: TaskModel[]) {
    // for (let ingredient of tasks) {
    //   this.addIngredient(ingredient);
    // }
    this.tasks.push(...ingredients);
    this.ingredientsChanged.next(this.tasks.slice());
  }

  updateIngredient(index: number, newIngredient: TaskModel) {
    this.tasks[index] = newIngredient;
    this.ingredientsChanged.next(this.tasks.slice());
  }

  deleteIngredient(index: number) {
    this.tasks.splice(index, 1);
    this.ingredientsChanged.next(this.tasks.slice());
  }
}
