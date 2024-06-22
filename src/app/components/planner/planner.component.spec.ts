import { Task } from './../../interfaces/task';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlannerComponent } from './planner.component';
import { MatDialog } from '@angular/material/dialog';
import { TaskDialogComponent } from './task-dialog/task-dialog.component';

describe('PlannerComponent', () => {
  let component: PlannerComponent;
  let fixture: ComponentFixture<PlannerComponent>;
  let dialog: MatDialog;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        PlannerComponent
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlannerComponent);
    component = fixture.componentInstance;
    dialog = TestBed.inject(MatDialog);
    fixture.detectChanges();
  });

  it('should open the dialog', () => {
    spyOn(dialog, 'open').and.callThrough();

    const mockTask: Task = {
      title: 'Test Name',
      description: 'Test Desc'
    }

    component.openTaskDialog(mockTask);

    expect(dialog.open).toHaveBeenCalledWith(TaskDialogComponent, {
      data: mockTask
    });
  });
});
