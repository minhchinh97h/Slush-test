import { PipeTransform, Pipe } from "@angular/core";
import { Task } from "./task.model";
import { TasksService } from "../tasks.service";

@Pipe({
  name: "filterTasks"
})
export class FilterTasksPipe implements PipeTransform {
  oldUpdatePipeCount: number = -1;
  constructor(private tasksService: TasksService) {}

  filterByName(tasks: Task[], searchValue: string): Task[] {
    let filteredTasks = [];
    tasks.forEach((task: Task) => {
      if (task.title.indexOf(searchValue) > -1) {
        filteredTasks.push(task);
      }
    });

    return filteredTasks;
  }

  filterByTags(tasks: Task[], searchValue: string): Task[] {
    if (searchValue === "") {
      return tasks;
    }

    let filteredTasks = [];

    let enteredTags = searchValue.trim().split(/\s*,\s*/);
    enteredTags = enteredTags.filter((tag: string) => {
      return tag.length > 0;
    });

    tasks.forEach((task: Task) => {
      const taskTags = task.tags;
      const taskTagIndex = taskTags.findIndex((tag: string) => {
        let tagIndex = enteredTags.findIndex((enteredTag: string) => {
          return tag === enteredTag;
        });

        return tagIndex > -1;
      });

      if (taskTagIndex > -1) {
        filteredTasks.push(task);
      }
    });

    return filteredTasks;
  }

  transform(
    value: Task[],
    method: string,
    searchValue: string,
    updatePipeCount: number
  ): Task[] {
    if (updatePipeCount !== this.oldUpdatePipeCount) {
      if (method === "name") {
        this.oldUpdatePipeCount = updatePipeCount;
        return this.filterByName(value, searchValue);
      } else {
        this.oldUpdatePipeCount = updatePipeCount;
        return this.filterByTags(value, searchValue);
      }
    }
  }
}
