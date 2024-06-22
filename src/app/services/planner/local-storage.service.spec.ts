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
      { title: 'Test Category', tasks: [] },
      { title: 'Another Category', tasks: [] }
    ];

    service.saveCategories(categories);
    const loadedCategories = service.loadCategories();

    expect(loadedCategories).toEqual(categories);
  });

  it('should load default categories if none are stored', () => {
    localStorage.removeItem(service.storageKey);
    const defaultCategories = [
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

    const loadedCategories = service.loadCategories();

    expect(loadedCategories).toEqual(defaultCategories);
  });
});
