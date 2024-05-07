import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

export interface Task {
  title: string;
  desc: string;
}

export interface Category {
  title: string;
  tasks: Task[];
}

@Component({
  selector: 'app-planner',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule
  ],
  templateUrl: './planner.component.html',
  styleUrl: './planner.component.scss'
})
export class PlannerComponent {
  categories: Category[] = [
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
    },
  ];

  addCategory(): void {
    this.categories.push({title: '', tasks: []});
  }
}
