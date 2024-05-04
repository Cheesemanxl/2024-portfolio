import { GridService } from '../../../services/grid/grid.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-grid-cell',
  standalone: true,
  imports: [],
  templateUrl: './grid-cell.component.html',
  styleUrl: './grid-cell.component.scss'
})
export class GridCellComponent {

  constructor(public gridService: GridService) {}

  paintTile(event: MouseEvent) {
    const element: HTMLElement = (event.target  as HTMLElement);

    if(element.style.backgroundColor != this.gridService.color) {
      element.style.backgroundColor = this.gridService.color;
    }
  }

  resetTile(event: MouseEvent) {
    const element: HTMLElement = (event.target  as HTMLElement);

    if(element.style.backgroundColor != this.gridService.backgroundColor) {
      element.style.backgroundColor = this.gridService.backgroundColor;
    }
  }

  dragoverTile(event: MouseEvent) {
    event.preventDefault();

    if (this.gridService.leftDragging) {
      this.paintTile(event);
    } else if (this.gridService.rightDragging) {
      this.resetTile(event);
    }
  }

  onRightClick(event: MouseEvent) {
    event.preventDefault();

    this.resetTile(event);
  }

  startDragging(event: MouseEvent) {
    if(event.button === 2) {
      this.gridService.rightDragging = true;
    } else {
      this.gridService.leftDragging = true;
    }
  }

  stopDragging(event: MouseEvent) {
    if(event.button === 2) {
      this.gridService.rightDragging = false;
    } else {
      this.gridService.leftDragging = false;
    }
  }
}
