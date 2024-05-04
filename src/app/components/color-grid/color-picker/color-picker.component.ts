import { AfterViewInit, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridService } from '../../../services/grid/grid.service';

@Component({
  selector: 'app-color-picker',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './color-picker.component.html',
  styleUrl: './color-picker.component.scss',
})
export class ColorPickerComponent implements AfterViewInit {
  colors: string[] = [
    'white',
    'black',
    'red',
    'orange',
    'yellow',
    'green',
    'lime',
    'blue',
    'cyan',
    'indigo',
    '#B9B9B6',
    '#181818'
  ];

  constructor(public gridService: GridService) {}

  ngAfterViewInit(): void {
    const colorOptions: NodeListOf<Element> = document.querySelectorAll('div.color-option');

    colorOptions.forEach((option) => {
      const isDefaultColorOption: boolean | undefined = option.getAttribute('style')?.includes('background-color: ' + this.gridService.color + ';');

      if(isDefaultColorOption) {
        option.classList.add('selected-option');
      }
    });
  }

  onOptionClicked(e: MouseEvent, color: string): void {
    const prevSelection: HTMLElement | null =
      document.querySelector('.selected-option');

    if (prevSelection) {
      prevSelection.classList.remove('selected-option');
    }

    (e.target as HTMLElement).classList.add('selected-option');

    this.gridService.color = color;
  }
}
