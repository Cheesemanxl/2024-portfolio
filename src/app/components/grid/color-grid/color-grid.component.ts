import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { GridColumnComponent } from '../grid-column/grid-column.component';
import { ColorPickerComponent } from '../../color-picker/color-picker.component';
import { GridService } from '../../../services/grid/grid.service';


@Component({
  selector: 'app-color-grid',
  standalone: true,
  imports: [
    RouterOutlet,
    GridColumnComponent,
    ColorPickerComponent,
    CommonModule,
  ],
  templateUrl: './color-grid.component.html',
  styleUrl: './color-grid.component.scss'
})
export class ColorGridComponent {
  constructor(public cellService: GridService) {}

  clearGrid(): void {
    const elements: NodeList = document.querySelectorAll('.cell');
    (elements as NodeListOf<HTMLElement>).forEach((element: HTMLElement) => {
      element.style.backgroundColor = 'white';
    });
  }
}
