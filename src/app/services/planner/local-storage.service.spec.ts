import { TestBed } from '@angular/core/testing';

import { LocalStorageService } from './local-storage.service';
import { Category } from '../../interfaces/category';

describe('LocalStorageService', () => {
  let service: LocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStorageService);
  });

  it('should save and load categories', () => {
    const categories: Category[] = [
      { id: 0, type: 'task', title: 'Test Category', tasks: [] },
      { id: 1, type: 'task', title: 'Another Category', tasks: [] }
    ];

    service.saveCategories(categories);
    const loadedCategories = service.loadCategories();

    expect(loadedCategories).toEqual(categories);
  });

  it('should load default categories if none are stored', () => {
    localStorage.removeItem(service.storageKey);
    const defaultCategories = [
      {
        id: 0,
        type: 'category',
        title: 'Not Started',
        tasks: []
      },
      {
        id: 1,
        type: 'category',
        title: 'Work in Progress',
        tasks: []
      },
      {
        id: 2,
        type: 'category',
        title: 'Complete',
        tasks: []
      }
    ];

    const loadedCategories = service.loadCategories();

    expect(loadedCategories).toEqual(defaultCategories);
  });
});
