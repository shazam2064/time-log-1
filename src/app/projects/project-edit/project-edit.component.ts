import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import { ProjectService } from '../project.service';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.css']
})
export class ProjectEditComponent implements OnInit {
  id: number;
  editMode = false;
  projectForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });
  }

  onSubmit() {
    if (this.editMode) {
      this.projectService.updateProject(this.id, this.projectForm.value);
    } else {
      this.projectService.addProject(this.projectForm.value);
    }
    this.onCancel();
  }

  onAddTask() {
    (<FormArray>this.projectForm.get('tasks')).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    );
  }

  onDeleteTask(index: number) {
    (<FormArray>this.projectForm.get('tasks')).removeAt(index);
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  private initForm() {
    let projectName = '';
    let projectImagePath = '';
    let projectDescription = '';
    let projectTasks = new FormArray([]);

    if (this.editMode) {
      const project = this.projectService.getProject(this.id);
      projectName = project.name;
      projectImagePath = project.imagePath;
      projectDescription = project.description;
      if (project['tasks']) {
        for (let task of project.tasks) {
          projectTasks.push(
            new FormGroup({
              name: new FormControl(task.name, Validators.required),
              amount: new FormControl(task.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)
              ])
            })
          );
        }
      }
    }

    this.projectForm = new FormGroup({
      name: new FormControl(projectName, Validators.required),
      imagePath: new FormControl(projectImagePath, Validators.required),
      description: new FormControl(projectDescription, Validators.required),
      tasks: projectTasks
    });
  }
}
