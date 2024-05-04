import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { GridColumnComponent } from './grid-column/grid-column.component';
import { ColorPickerComponent } from './color-picker/color-picker.component';
import { GridService } from '../../services/grid/grid.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-color-grid',
  standalone: true,
  imports: [
    RouterOutlet,
    GridColumnComponent,
    ColorPickerComponent,
    CommonModule,
    MatButtonModule
  ],
  templateUrl: './color-grid.component.html',
  styleUrl: './color-grid.component.scss'
})
export class ColorGridComponent {
  constructor(public gridService: GridService) {}

  clearGrid(): void {
    const elements: NodeList = document.querySelectorAll('.cell');
    (elements as NodeListOf<HTMLElement>).forEach((element: HTMLElement) => {
      element.style.backgroundColor = this.gridService.backgroundColor;
    });
  }
}
