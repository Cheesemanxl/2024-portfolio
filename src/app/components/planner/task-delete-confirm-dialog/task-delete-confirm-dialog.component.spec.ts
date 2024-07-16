import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { TaskDeleteConfirmDialogComponent } from './task-delete-confirm-dialog.component';
import { Category } from '../../../interfaces/category';
import { Task } from '../../../interfaces/task';

describe('TaskDeleteConfirmDialogComponent', () => {
  let component: TaskDeleteConfirmDialogComponent;
  let fixture: ComponentFixture<TaskDeleteConfirmDialogComponent>;

  const mockTask: Task = {
    id: 0,
    type: 'task',
    title: 'Test Task',
    description: 'Test Description'
  };

  const mockCategory: Category = {
    id: 0,
    type: 'category',
    title: 'Mock Category',
    tasks: [mockTask]
  }

  const mockDialogData: any = {
    Category: mockCategory,
    Task: mockTask
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TaskDeleteConfirmDialogComponent,
        MatDialogModule
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: mockDialogData },
        { provide: MatDialogRef, useValue: {} }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskDeleteConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
