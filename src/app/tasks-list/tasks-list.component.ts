import { Component, OnInit } from '@angular/core';
import { tasks } from '../tasks';
import { FormsModule } from '@angular/forms';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css']
})
export class TasksListComponent implements OnInit {
  tasks = tasks;
  allTasksCount: number;
  uncompletedTasksCount: number;
  completedTasksCount: number;
  currentTasks = tasks;
  selectedButton = 'allButton';
  content = '';
  constructor() {

  }

  drop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.currentTasks, event.previousIndex, event.currentIndex);
  }

  ngOnInit(): void {
    this.countTasks();
  }

  changeStatus(event, index: number): void {
    tasks[index].checkStatus = !tasks[index].checkStatus;
    if (event.target.checked) {
      const item = tasks.splice(index, 1);
      tasks.push(item[0]);
    }
    this.countTasks();
  }

  removeTask(index: number): void {
    tasks.splice(index, 1); // remove element from tasks
    this.countTasks();
  }

  countTasks(): void {
    this.allTasksCount = tasks.length;
    let uncompletedTasksCount = 0;
    let completedTasksCount = 0;
    for (const item of tasks) {
      item.checkStatus
        ? completedTasksCount++
        : uncompletedTasksCount++;
    }
    this.completedTasksCount = completedTasksCount;
    this.uncompletedTasksCount = uncompletedTasksCount;
  }

  getAllTasks(): void {
    this.currentTasks = tasks;
    this.selectedButton = 'allButton';
  }

  getCompletedTasks(): void {
    this.currentTasks = tasks.filter(item => item.checkStatus);
    this.selectedButton = 'completedButton';
  }

  getUncompletedTasks(): void {
    this.currentTasks = tasks.filter(item => !item.checkStatus);
    this.selectedButton = 'uncompletedButton';
  }
  addTask(content: string): void {
    const newTask = {
      task: content,
      checkStatus: false
    };
    tasks.unshift(newTask);
    this.countTasks();
  }
}

