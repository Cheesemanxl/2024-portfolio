import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { PlannerService } from '../../../services/planner/planner.service';

@Component({
  selector: 'app-task-delete-confirm-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule
  ],
  templateUrl: './task-delete-confirm-dialog.component.html',
  styleUrl: './task-delete-confirm-dialog.component.scss'
})
export class TaskDeleteConfirmDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public plannerService: PlannerService
  ) {}
}
