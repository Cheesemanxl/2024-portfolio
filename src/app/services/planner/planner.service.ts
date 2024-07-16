import { Category } from './../../interfaces/category';
import { LocalStorageService } from './local-storage.service';
import { Injectable } from '@angular/core';
import { Task } from '../../interfaces/task';

@Injectable({
  providedIn: 'root'
})
export class PlannerService {
  maxTitleLength: number = 25;
  maxDescriptionLength: number = 2500;

  categories: Category[];

  constructor(public localStorageService: LocalStorageService) {
    this.categories = this.localStorageService.loadCategories();
  }

  saveCategories() {
    this.localStorageService.saveCategories(this.categories);
  }

  addCategory(): void {
    this.categories.push(
      {
        id: this.assignCategoryId(),
        type: 'category',
        title: 'New Category',
        tasks: []
      });
    this.saveCategories();
  }

  deleteCategory(category: Category): void {
    this.categories.splice(this.categories.indexOf(category), 1);
    this.saveCategories();
  }

  addTask(category: Category): void {
    category.tasks.push(
      {
        id: this.assignTaskId(category),
        type: "task",
        title: 'New Task',
        description: 'Edit Description...'
      });
    this.saveCategories();
  }

  deleteTask(category: Category, task: Task): void {
    category.tasks.splice(category.tasks.indexOf(task), 1);
    this.saveCategories();
  }

  onTitleInputChange(object: Category | Task, event: any): void {
    const inputValue = event.target.value;

    if (inputValue.length > this.maxTitleLength) {
      object.title = inputValue.substring(0, this.maxTitleLength);
    } else {
      object.title = inputValue;
    }
    this.saveCategories();
  }

  onDescriptionInputChange(task: Task, event: any): void {
    const inputValue = event.target.value;

    if (inputValue.length > this.maxDescriptionLength) {
      task.description = inputValue.substring(0, this.maxDescriptionLength);
    } else {
      task.description = inputValue;
    }
    this.saveCategories();
  }

  assignCategoryId(): number {
    let result: number = Math.random() * 10000;
    let existingIds: number[] = [];

    this.categories.forEach((category) => {
      existingIds.push(category.id);
    });

    while(existingIds.includes(result)) {
      result = Math.random() * 10000;
    }

    return result;
  }

  assignTaskId(category: Category): number {
    let result: number = Math.random() * 10000;
    let existingIds: number[] = [];

    category.tasks.forEach((task) => {
      existingIds.push(task.id);
    });

    while(existingIds.includes(result)) {
      result = Math.random() * 10000;
    }

    return result;
  }
}
