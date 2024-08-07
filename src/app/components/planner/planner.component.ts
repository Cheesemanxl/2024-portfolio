import { Category } from './../../interfaces/category';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { TaskDialogComponent } from './task-dialog/task-dialog.component';
import { CategoryDeleteConfirmDialogComponent } from './category-delete-confirm-dialog/category-delete-confirm-dialog.component';
import { Task } from '../../interfaces/task';
import { PlannerService } from '../../services/planner/planner.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDrag, CdkDropList } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-planner',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    CdkDropList,
    CdkDrag
  ],

  templateUrl: './planner.component.html',
  styleUrl: './planner.component.scss'
})
export class PlannerComponent {
  constructor(
    public plannerService: PlannerService,
    public dialog: MatDialog
  ) {}

  openTaskDialog(category: Category, task: Task): void {
    this.dialog.open(TaskDialogComponent, {
      data: {
        Category: category,
        Task: task
      }
    });
  }

  openDeleteConfirmDialog(category: Category): void {
    this.dialog.open(CategoryDeleteConfirmDialogComponent, {
      data: category
    });
  }

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  getConnectedListIds(): string[] {
    return this.plannerService.categories.map(category => category.id.toString());
  }
}
