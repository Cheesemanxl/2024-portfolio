import { Injectable } from '@angular/core';
import { Task } from '../../interfaces/task';
import { Category } from '../../interfaces/category';


@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private storageKey: string = 'userCategories';

  saveCategories(categories: Category[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(categories));
  }

  loadCategories(): Category[] {
    const storedCategories: string | null= localStorage.getItem(this.storageKey);
    return storedCategories ? JSON.parse(storedCategories) : this.getDefaultCategories();
  }

  private getDefaultCategories(): Category[] {
    return [
      {
        title: 'Not Started',
        tasks: []
      },
      {
        title: 'Work in Progress',
        tasks: []
      },
      {
        title: 'Complete',
        tasks: []
      }
    ];
  }
}
