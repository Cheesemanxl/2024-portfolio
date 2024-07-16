import { Injectable } from '@angular/core';
import { Task } from '../../interfaces/task';
import { Category } from '../../interfaces/category';


@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  storageKey: string = 'userCategories';

  saveCategories(categories: Category[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(categories));
  }

  loadCategories(): Category[] {
    const storedCategories: string | null = localStorage.getItem(this.storageKey);
    return storedCategories ? JSON.parse(storedCategories) : this.getDefaultCategories();
  }

  getDefaultCategories(): Category[] {
    return [
      {
        id: 0,
        type: "category",
        title: 'Not Started',
        tasks: []
      },
      {
        id: 1,
        type: "category",
        title: 'Work in Progress',
        tasks: []
      },
      {
        id: 2,
        type: "category",
        title: 'Complete',
        tasks: []
      }
    ];
  }
}
