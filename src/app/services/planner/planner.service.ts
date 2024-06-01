import { LocalStorageService } from './local-storage.service';
import { Injectable } from '@angular/core';
import { Category } from '../../interfaces/category';
import { Task } from '../../interfaces/task';

@Injectable({
  providedIn: 'root'
})
export class PlannerService {
  maxCategoryTitleLength: number = 25;

  categories: Category[] = [];

  constructor(public localStorageService: LocalStorageService) {
    this.categories = this.localStorageService.loadCategories();
  }

  saveCategories() {
    this.localStorageService.saveCategories(this.categories);
  }

  addCategory(): void {
    this.categories.push({title: 'New Category', tasks: []});
    this.saveCategories();
  }

  addTask(category: Category): void {
    category.tasks.push({title: 'New Task', description: 'Edit Description...'});
    this.saveCategories();
  }

  onCategoryTitleInputChange(category: Category, event: any): void {
    const inputValue = event.target.value;

    if (inputValue.length > this.maxCategoryTitleLength) {
      category.title = inputValue.substring(0, this.maxCategoryTitleLength);
    } else {
      category.title = inputValue;
    }
    this.saveCategories();
  }
}
