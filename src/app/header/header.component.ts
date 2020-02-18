import { Component, OnInit, Output, EventEmitter } from "@angular/core";

import { auth, firestore } from "firebase";
import { TasksService } from "../tasks.service";
import { Task } from "../shared/task.model";

let firestoreListener = null;

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  collapsed: boolean = true;
  loggedIn: boolean = false;
  user: string = "";

  @Output() featureSelected = new EventEmitter<string>();

  constructor(private tasksService: TasksService) {}

  syncData(savedTasks: Task[], currentTasks: Task[]): Task[] {
    let resultTasks = [...savedTasks];
    currentTasks.forEach((task: Task, index: number) => {
      // Compare in-range index
      if (savedTasks[index]) {
        // Always take the current task as it is the latest
        if (savedTasks[index].id === currentTasks[index].id) {
          resultTasks[index] = currentTasks[index];
        } else {
          resultTasks.push(currentTasks[index]);
        }
      } else {
        resultTasks.push(currentTasks[index]);
      }
    });

    return resultTasks;
  }

  ngOnInit(): void {
    auth().onAuthStateChanged((user: firebase.User) => {
      this.loggedIn = true;
      if (user) {
        this.user = user.email;

        // Synchronize saved tasks and current tasks
        firestoreListener = firestore()
          .collection("tasks")
          .doc(this.user)
          .onSnapshot(
            (doc: firestore.DocumentSnapshot<firestore.DocumentData>) => {
              const currentTasks = this.tasksService.getTasks();
              const savedTasks = doc.exists ? <Task[]>doc.data().tasks : [];

              const syncedTasks = this.syncData(savedTasks, currentTasks);

              this.tasksService.returnNewTasks(syncedTasks);
            }
          );
      } else {
        this.loggedIn = false;

        // Unsubscribe onSnapshot
        if (firestoreListener) {
          firestoreListener();
        }
      }
    });
  }

  onSelect(feature: string) {
    this.featureSelected.emit(feature);
  }

  onLogout() {
    auth()
      .signOut()
      .then(() => {
        // Reset tasks
        this.tasksService.returnNewTasks([]);
      })
      .catch(err => {
        // Handle error
      });
  }

  onSaveData() {
    if (this.loggedIn) {
      firestore()
        .collection("tasks")
        .doc(this.user)
        .get()
        .then((doc: firestore.DocumentSnapshot<firestore.DocumentData>) => {
          const savedTasks = doc.exists ? <Task[]>doc.data().tasks : [];
          const currentTasks = this.tasksService.getTasks();
          const syncedTasks = this.syncData(savedTasks, currentTasks);
          return firestore()
            .collection("tasks")
            .doc(this.user)
            .set({ tasks: syncedTasks });
        })
        .then(() => {
          alert("Saved successfully to Firestore!");
        })
        .catch(err => {
          alert(err);
        });
    } else {
      alert("Please login first!");
    }
  }
}
