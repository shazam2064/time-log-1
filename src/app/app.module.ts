import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ProjectComponent } from './projects/project.component';
import { ProjectListComponent } from './projects/project-list/project-list.component';
import { ProjectDetailComponent } from './projects/projects-detail/project-detail.component';
import { ProjectItemComponent } from './projects/project-list/project-item/project-item.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskEditComponent } from './task-list/task-edit/task-edit.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { TaskListService } from './task-list/task-list.service';
import { AppRoutingModule } from './app-routing.module';
import { ProjectStartComponent } from './projects/project-start/project-start.component';
import { ProjectEditComponent } from './projects/project-edit/project-edit.component';
import { ProjectService } from './projects/project.service';
import { AuthComponent } from './auth/auth.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { UsersComponent } from './users/users.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProjectComponent,
    ProjectListComponent,
    ProjectDetailComponent,
    ProjectItemComponent,
    TaskListComponent,
    TaskEditComponent,
    DropdownDirective,
    ProjectStartComponent,
    ProjectEditComponent,
    AuthComponent,
    LoadingSpinnerComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    TaskListService,
    ProjectService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
