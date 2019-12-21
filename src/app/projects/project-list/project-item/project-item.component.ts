import { Component, OnInit, Input } from '@angular/core';

import { ProjectModel } from '../../project.model';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.css']
})
export class ProjectItemComponent implements OnInit {
  @Input() projectModel: ProjectModel;
  @Input() index: number;

  ngOnInit() {
  }
}
