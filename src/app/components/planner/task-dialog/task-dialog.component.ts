import { PlannerService } from './../../../services/planner/planner.service';
import { Component, Inject } from '@angular/core';
import { Task } from '../../../interfaces/task';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TextFieldModule } from '@angular/cdk/text-field';
import { TaskDeleteConfirmDialogComponent } from '../task-delete-confirm-dialog/task-delete-confirm-dialog.component';
import { CommonModule } from '@angular/common';
import { Category } from '../../../interfaces/category';

@Component({
  selector: 'app-task-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    TextFieldModule,
    MatIconModule
  ],
  templateUrl: './task-dialog.component.html',
  styleUrl: './task-dialog.component.scss'
})
export class TaskDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public plannerService: PlannerService,
    public dialog: MatDialog
  ) {}

  openTaskDeleteConfirmDialog(category: Category, task: Task): void {
    this.dialog.open(TaskDeleteConfirmDialogComponent, {
      data: {
        Category: category,
        Task: task
      }
    });
  }
}
