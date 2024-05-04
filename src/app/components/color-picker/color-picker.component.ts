import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridService } from '../../services/grid/grid.service';

@Component({
  selector: 'app-color-picker',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './color-picker.component.html',
  styleUrl: './color-picker.component.scss'
})
export class ColorPickerComponent {
  colors: string[] = [
    'white',
    'black',
    'red',
    'orange',
    'yellow',
    'green',
    'blue',
    'indigo',
    'violet',
    'pink',
    'purple',
    'brown',
    '#B9B9B6',
    'lime',
    'cyan'
  ]

  constructor(
    public gridService: GridService
  ) {}

  onOptionClicked(e: MouseEvent, color: string): void {
    const prevSelection: HTMLElement | null = document.querySelector('.selected-option');

    if (prevSelection) {
      prevSelection.classList.remove('selected-option');
    }

    (e.target as HTMLElement).classList.add('selected-option');

    this.gridService.color = color;
  }
}
