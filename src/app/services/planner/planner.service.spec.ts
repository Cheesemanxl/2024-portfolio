import { TestBed } from '@angular/core/testing';
import { PlannerService } from './planner.service';
import { LocalStorageService } from './local-storage.service';
import { Task } from '../../interfaces/task';
import { Category } from './../../interfaces/category';

describe('PlannerService', () => {
  let service: PlannerService;
  let localStorageServiceSpy: jasmine.SpyObj<LocalStorageService>;
  let mockCategories: Category[] = [
    {
      id: 0,
      type: 'task',
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

  describe('deleteCategory', () => {
    it('should delete the specified category from the array', () => {
      const mockCategory: Category = {
        id: 0,
        type: 'category',
        title: 'Mock Category',
        tasks: []
      }

      service.categories = [mockCategory];
      service.deleteCategory(mockCategory);

      expect(service.categories.length).toEqual(0);
      expect(localStorageServiceSpy.saveCategories).toHaveBeenCalled();
    });
  });

  describe('addTask', () => {
    it('should add a new task to the category', () => {
      const mockCategory: Category = {
        id: 0,
        type: 'category',
        title: 'Mock Category',
        tasks: []
      };

      service.addTask(mockCategory);

      expect(mockCategory.tasks.length).toEqual(1);
      expect(localStorageServiceSpy.saveCategories).toHaveBeenCalled();
    });
  });

  describe('deleteTask', () => {
    it('should delete the task from the category', () => {
      const mockTask: Task = {
        id: 0,
        type: 'task',
        title: 'Mock Task',
        description: 'Mock Desc'
      }

      const mockCategory: Category = {
        id: 0,
        type: 'category',
        title: 'Mock Category',
        tasks: [mockTask]
      };

      service.deleteTask(mockCategory, mockTask);

      expect(mockCategory.tasks.length).toEqual(0);
      expect(localStorageServiceSpy.saveCategories).toHaveBeenCalled();
    });
  });

  describe('onTitleInputChange', () => {
    it('change the title', () => {
      const mockCategory: Category = {
        id: 0,
        type: 'category',
        title: 'Mock Category',
        tasks: []
      };

      const mockEvent = { target: { value: 'test value' }};

      service.onTitleInputChange(mockCategory, mockEvent);

      expect(mockCategory.title).toEqual('test value');
      expect(localStorageServiceSpy.saveCategories).toHaveBeenCalled();
    });

    it('change the title within the length limit', () => {
      const mockCategory: Category = {
        id: 0,
        type: 'category',
        title: 'Mock Category',
        tasks: []
      };

      const mockEvent = { target: { value: 'test super long string value that exceeds length limit' }};

      service.onTitleInputChange(mockCategory, mockEvent);

      expect(mockCategory.title).toEqual('test super long string va');
      expect(localStorageServiceSpy.saveCategories).toHaveBeenCalled();
    });
  });

  describe('onDescriptionInputChange', () => {
    it('should change the description', () => {
      const mockTask: Task = {
        id: 0,
        type: 'task',
        title: 'Mock Task',
        description: 'Mock Desc'
      }

      const mockEvent = { target: { value: 'test desc' }};

      service.onDescriptionInputChange(mockTask, mockEvent);

      expect(mockTask.description).toEqual('test desc');
      expect(localStorageServiceSpy.saveCategories).toHaveBeenCalled();
    });

    it('should change the description within the length limit', () => {
      const descValue: string = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' +
          'Integer consectetur mauris vitae augue convallis gravida. Sed sit amet nisl interdum, faucibus ipsum sed, laoreet nisl.' +
          'Donec ex eros, tincidunt ac ex eget, scelerisque ullamcorper nibh. Quisque at vehicula erat. Aenean nulla est, ultricies' +
          'quis elit eget, convallis faucibus dui. Cras ac sollicitudin dolor, mattis laoreet ligula. Ut rhoncus dui enim, at viverra' +
          'neque convallis ut. Aenean egestas orci a elit tempus pulvinar sed vitae ante. Fusce a arcu et erat feugiat pellentesque.' +
          'Pellentesque lacinia neque id tellus tempor vehicula. Donec ac dictum quam, vel bibendum odio. Nullam iaculis eros non ' +
          'libero vulputate semper. Nullam sit amet turpis aliquet, tempus felis sit amet, consectetur nunc. Praesent lacinia semper' +
          'maximus. Suspendisse et odio non orci commodo pharetra. Proin molestie urna nec nibh elementum tincidunt. Quisque eleifend ' +
          'tellus sit amet tortor semper accumsan. Donec libero velit, porta a sollicitudin in, ultrices quis magna. Fusce sit amet egestas ' +
          'odio, sit amet aliquet nisi. Nulla non velit arcu. Nullam eget consectetur nisl, quis tristique justo. Fusce nunc justo,' +
          ' dapibus nec erat quis, pulvinar sollicitudin risus. Mauris at felis nibh. In hac habitasse platea dictumst. Suspendisse ' +
          'euismod elit sit amet arcu commodo, elementum venenatis felis faucibus. Nam nec finibus mauris, eu pulvinar sapien. Ut' +
          ' ultrices ornare felis, a luctus risus gravida at. Integer nunc lacus, blandit ut tincidunt ut, venenatis et tortor.' +
          'In feugiat est id magna vulputate, sit amet maximus nisi blandit. Duis elementum nulla vel lectus fermentum, ullamcorper' +
          ' consequat sapien vestibulum. Vestibulum imperdiet placerat mauris quis scelerisque. Phasellus lacinia ex tellus, in' +
          ' egestas augue lacinia eget. Ut tempus odio sapien, in cursus lectus mollis at. Etiam felis purus, tincidunt vitae nulla non,' +
          'porttitor accumsan leo. Phasellus vitae ornare ipsum, non convallis augue. In ipsum odio, molestie ut sapien sed, elementum' +
          ' ultricies lacus. Mauris ut semper magna, non fringilla libero. Aenean eget libero nec elit dictum semper eu a sem. Donec'+
          ' vestibulum molestie aliquam. Donec interdum finibus lorem, quis tincidunt mi tempor sit amet. Nam vehicula nisi congue' +
          ' posuere posuere. Proin sit amet metus dictum, commodo nisi a, dignissim lectus. Ut consectetur mollis ante, at mattis erat' +
          ' iaculis sed. Aenean non interdum dui, et sodales ligula. Aliquam efficitur tempor lorem, hendrerit consequat velit' +
          ' faucibus id. Fusce non aliquam nunc. Quisque semper nisl ornare ornare aenean.';

      const mockTask: Task = {
        id: 0,
        type: 'task',
        title: 'Mock Task',
        description: 'Mock Desc'
      }

      const mockEvent = {
        target: {
          value: descValue
        }
      };

      service.onDescriptionInputChange(mockTask, mockEvent);

      expect(mockTask.description).toEqual(descValue.slice(0, service.maxDescriptionLength));
      expect(localStorageServiceSpy.saveCategories).toHaveBeenCalled();
    });
  });

  describe('assignCategoryId', () => {
    it('should return a number between 0 and 9999', () => {
      const result = service.assignCategoryId();
      expect(result).toBeGreaterThanOrEqual(0);
      expect(result).toBeLessThan(10000);
    });

    it('should not return an existing id', () => {
      service.categories = [
        { id: 1000, type: 'category', title: 'Category 1', tasks: [] },
        { id: 2000, type: 'category', title: 'Category 2', tasks: [] },
        { id: 3000, type: 'category', title: 'Category 3', tasks: [] },
      ];

      const spy = spyOn(Math, 'random').and.returnValues(0.1, 0.2, 0.3);

      const result = service.assignCategoryId();

      expect(result).not.toBe(1000);
      expect(result).not.toBe(2000);
      expect(result).not.toBe(3000);
      expect(spy).toHaveBeenCalledTimes(4);
    });

    it('should generate new ids until a unique one is found', () => {
      service.categories = [
        { id: 1000, type: 'category', title: 'Category 1', tasks: [] },
        { id: 2000, type: 'category', title: 'Category 2', tasks: [] }
      ];

      const spy = spyOn(Math, 'random').and.returnValues(0.1, 0.2, 0.3);

      const result = service.assignCategoryId();

      expect(result).toBe(3000);
      expect(spy).toHaveBeenCalledTimes(3);
    });
  });

  describe('assignTaskId', () => {
    it('should return a number between 0 and 9999', () => {
      const category: Category = { id: 1, type: 'category', title: 'Test Category', tasks: [] };
      const result = service.assignTaskId(category);
      expect(result).toBeGreaterThanOrEqual(0);
      expect(result).toBeLessThan(10000);
    });

    it('should not return an existing task id', () => {
      const category: Category = {
        id: 1,
        type: 'category',
        title: 'Test Category',
        tasks: [
          { id: 1000, type: 'task', title: 'Task 1', description: 'test' },
          { id: 2000, type: 'task', title: 'Task 1', description: 'test' },
          { id: 3000, type: 'task', title: 'Task 1', description: 'test' },
        ]
      };

      const spy = spyOn(Math, 'random').and.returnValues(0.1, 0.2, 0.3);

      const result = service.assignTaskId(category);

      expect(result).not.toBe(1000);
      expect(result).not.toBe(2000);
      expect(result).not.toBe(3000);
      expect(spy).toHaveBeenCalledTimes(4);
    });

    it('should generate new ids until a unique one is found', () => {
      const category: Category = {
        id: 1,
        type: 'category',
        title: 'Test Category',
        tasks: [
          { id: 1000, type: 'task', title: 'Task 1', description: 'test' },
          { id: 2000, type: 'task', title: 'Task 1', description: 'test' }
        ]
      };

      const spy = spyOn(Math, 'random').and.returnValues(0.1, 0.2, 0.3);

      const result = service.assignTaskId(category);

      expect(result).toBe(3000);
      expect(spy).toHaveBeenCalledTimes(3);
    });
  });
});
