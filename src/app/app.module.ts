import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { DropdownDirective } from "./shared/dropdown.directive";
import { AppRoutingModule } from "./app-routing.module";
import { HomeComponent } from "./home/home.component";
import { AddTaskComponent } from "./add-task/add-task.component";
import { DisplayAllComponent } from "./display-all/display-all.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { TagsComponent } from "./add-task/tags/tags.component";
import { TagComponent } from "./add-task/tags/tag/tag.component";
import { TasksService } from "./tasks.service";
import { TaskListComponent } from "./display-all/task-list/task-list.component";
import { TaskItemComponent } from "./display-all/task-list/task-item/task-item.component";
import { ShortenTextPipe } from "./shared/shorten-text.pipe";
import { CustomDatePipe } from './shared/customDate.pipe';
import { EditTaskComponent } from './edit-task/edit-task.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DropdownDirective,
    HomeComponent,
    AddTaskComponent,
    DisplayAllComponent,
    PageNotFoundComponent,
    TagsComponent,
    TagComponent,
    TaskListComponent,
    TaskItemComponent,
    ShortenTextPipe,
    CustomDatePipe,
    EditTaskComponent
  ],
  imports: [BrowserModule, FormsModule, AppRoutingModule],
  providers: [TasksService],
  bootstrap: [AppComponent]
})
export class AppModule {}
