import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

export interface Task {
  title: string;
  description: string;
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
      tasks: [
        {
          title: 'Lose Swag',
          description: 'Nooooooo'
        },
        {
          title: 'Be cringe',
          description: 'Nooooooo'
        },
        {
          title: 'Enforce char limit on task title',
          description: 'Nooooooo'
        },
        {
          title: 'Dialog for task editing / view',
          description: 'Nooooooo'
        },
        {
          title: 'Read this super long title name lmao why is it so long',
          description: 'Nooooooo'
        },
      ]
    },
    {
      title: 'Work in Progress',
      tasks: []
    },
    {
      title: 'Complete',
      tasks: []
    }
  ];

  addCategory(): void {
    this.categories.push({title: '', tasks: []});
  }

  addTask(category: Category): void {
    category.tasks.push({title: 'New Task', description: 'Default Description'});
  }

  onTitleInputChange(category: Category, event: any): void {
    category.title = event.target.value;
  }
}
