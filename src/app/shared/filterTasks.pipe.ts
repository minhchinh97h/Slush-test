import { PipeTransform, Pipe } from "@angular/core";
import { Task } from "./task.model";

@Pipe({
  name: "filterTasks"
})
export class FilterTasksPipe implements PipeTransform {
  oldUpdatePipeCount: number = -1; // Keep track of the previous assigned updatePipeCount in order to trigger the pipe

  filterByName(tasks: Task[], searchValue: string): Task[] {
    let filteredTasks = [];
    tasks.forEach((task: Task) => {
      // Compare titles in lowercase
      if (task.title.toLowerCase().indexOf(searchValue.toLowerCase()) > -1) {
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

    // Eliminates whitespaces
    let enteredTags = searchValue.trim().split(/\s*,\s*/);
    enteredTags = enteredTags.filter((tag: string) => {
      return tag.length > 0;
    });

    tasks.forEach((task: Task) => {
      const taskTags = task.tags;
      const taskTagIndex = taskTags.findIndex((tag: string) => {
        let tagIndex = enteredTags.findIndex((enteredTag: string) => {
          return tag.toLowerCase() === enteredTag.toLowerCase(); // Compare all tags in lowercase
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
    // Make certain to only trigger the pipe when updatePipeCount is updated, meaning
    // the "Search" button is clicked or switching bettwen filtering options to save performance
    if (updatePipeCount > this.oldUpdatePipeCount) {
      if (method === "name") {
        this.oldUpdatePipeCount = updatePipeCount;
        return this.filterByName(value, searchValue);
      } else {
        this.oldUpdatePipeCount = updatePipeCount;
        return this.filterByTags(value, searchValue);
      }
    } else {
      if (searchValue === "") {
        return value;
      } else {
        return [];
      }
    }
  }
}
