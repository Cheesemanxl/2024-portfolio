import { TestBed } from '@angular/core/testing';
import { PlannerService } from './planner.service';
import { LocalStorageService } from './local-storage.service';
import { Category } from '../../interfaces/category';

describe('PlannerService', () => {
  let service: PlannerService;
  let localStorageServiceSpy: jasmine.SpyObj<LocalStorageService>;
  let mockCategories: Category[] = [
    {
      title: 'Test Category',
      tasks: [],
    },
  ];

  beforeEach(() => {
    localStorageServiceSpy = jasmine.createSpyObj([
      'saveCategories',
      'loadCategories',
    ]);
    localStorageServiceSpy.loadCategories.and.returnValue(mockCategories);

    TestBed.configureTestingModule({
      providers: [
        PlannerService,
        { provide: LocalStorageService, useValue: localStorageServiceSpy },
      ],
    });
    service = TestBed.inject(PlannerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('addCategory', () => {
    it('should push a new category to the array', () => {
      service.categories = [];
      service.addCategory();

      expect(service.categories.length).toEqual(1);
      expect(localStorageServiceSpy.saveCategories).toHaveBeenCalled();
    });
  });

  describe('addTask', () => {
    it('should add a new task to the category', () => {
      const mockCategory: Category = {
        title: 'Mock Category',
        tasks: []
      };

      service.addTask(mockCategory);

      expect(mockCategory.tasks.length).toEqual(1);
      expect(localStorageServiceSpy.saveCategories).toHaveBeenCalled();
    });
  });

  describe('onCategoryTitleInputChange', () => {
    it('should push a new category to the array', () => {
      const mockCategory: Category = {
        title: 'Mock Category',
        tasks: []
      };

      const mockEvent = { target: { value: 'test value' }};

      service.onCategoryTitleInputChange(mockCategory, mockEvent);

      expect(mockCategory.title).toEqual('test value');
      expect(localStorageServiceSpy.saveCategories).toHaveBeenCalled();
    });

    it('should push a new category to the array', () => {
      const mockCategory: Category = {
        title: 'Mock Category',
        tasks: []
      };

      const mockEvent = { target: { value: 'test super long string value that exceeds length limit' }};

      service.onCategoryTitleInputChange(mockCategory, mockEvent);

      expect(mockCategory.title).toEqual('test super long string va');
      expect(localStorageServiceSpy.saveCategories).toHaveBeenCalled();
    });
  });
});
