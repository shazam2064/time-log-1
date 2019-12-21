import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { ProjectModel } from '../project.model';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {
  projectModel: ProjectModel;
  id: number;

  constructor(private projectService: ProjectService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.projectModel = this.projectService.getProject(this.id);
        }
      );
  }

  onAddToShoppingList() {
    this.projectService.addIngredientsToShoppingList(this.projectModel.tasks);
  }

  onEditProject() {
    this.router.navigate(['edit'], {relativeTo: this.route});
    // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
  }

  onDeleteProject() {
    this.projectService.deleteProject(this.id);
    this.router.navigate(['/projects']);
  }

}
