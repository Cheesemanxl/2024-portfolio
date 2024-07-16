import { Task } from './../../interfaces/task';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlannerComponent } from './planner.component';
import { MatDialog } from '@angular/material/dialog';
import { TaskDialogComponent } from './task-dialog/task-dialog.component';
import { Category } from '../../interfaces/category';
import { CategoryDeleteConfirmDialogComponent } from './category-delete-confirm-dialog/category-delete-confirm-dialog.component';

describe('PlannerComponent', () => {
  let component: PlannerComponent;
  let fixture: ComponentFixture<PlannerComponent>;
  let dialog: MatDialog;

  const mockTask: Task = {
    id: 0,
    type: 'task',
    title: 'Test Name',
    description: 'Test Desc',
  };

  const mockCategory: Category = {
    id: 0,
    type: 'category',
    title: 'Mock Category',
    tasks: [mockTask],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlannerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PlannerComponent);
    component = fixture.componentInstance;
    dialog = TestBed.inject(MatDialog);
    fixture.detectChanges();
  });

  describe('openTaskDialog', () => {
    it('should open the dialog', () => {
      spyOn(dialog, 'open').and.callThrough();

      component.openTaskDialog(mockCategory, mockTask);

      expect(dialog.open).toHaveBeenCalledWith(TaskDialogComponent, {
        data: {
          Category: mockCategory,
          Task: mockTask,
        },
      });
    });
  });

  describe('openDeleteConfirmDialog', () => {
    it('should open the dialog', () => {
      spyOn(dialog, 'open').and.callThrough();

      component.openDeleteConfirmDialog(mockCategory);

      expect(dialog.open).toHaveBeenCalledWith(CategoryDeleteConfirmDialogComponent, {
        data: mockCategory
      });
    });
  });
});
