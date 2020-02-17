import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { AddTaskComponent } from "./add-task/add-task.component";
import { DisplayAllComponent } from "./display-all/display-all.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { EditTaskComponent } from "./edit-task/edit-task.component";
const appRoutes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "add-task",
    component: AddTaskComponent
  },
  {
    path: "edit-task/:id",
    component: EditTaskComponent
  },
  {
    path: "display-all",
    component: DisplayAllComponent
  },
  {
    path: "not-found",
    component: PageNotFoundComponent
  },
  {
    path: "**",
    redirectTo: "not-found"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
