import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskDialogComponent } from './task-dialog.component';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Category } from '../../../interfaces/category';
import { Task } from '../../../interfaces/task';

describe('TaskDialogComponent', () => {
  let component: TaskDialogComponent;
  let fixture: ComponentFixture<TaskDialogComponent>;

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

  const mockDialogData: any = {
    Category: mockCategory,
    Task: mockTask
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TaskDialogComponent,
        MatDialogModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: mockDialogData },
        { provide: MatDialogRef, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
