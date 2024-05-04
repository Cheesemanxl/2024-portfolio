import { GridService } from '../../../services/grid/grid.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-grid-cell',
  standalone: true,
  imports: [],
  templateUrl: './grid-cell.component.html',
  styleUrl: './grid-cell.component.css'
})
export class GridCellComponent {

  constructor(public gridService: GridService) {}

  paintTile(e: MouseEvent) {
    const el: HTMLElement = (e.target  as HTMLElement);

    if(el.style.backgroundColor != this.gridService.color) {
      el.style.backgroundColor = this.gridService.color;
    }
  }

  resetTile(e: MouseEvent) {
    const el: HTMLElement = (e.target  as HTMLElement);

    if(el.style.backgroundColor != 'white') {
      el.style.backgroundColor = 'white';
    }
  }

  dragoverTile(e: MouseEvent) {
    e.preventDefault();

    if (this.gridService.leftDragging) {
      this.paintTile(e);
    } else if (this.gridService.rightDragging) {
      this.resetTile(e);
    }
  }

  onRightClick(e: MouseEvent) {
    e.preventDefault();

    this.resetTile(e);
  }

  startDragging(e: MouseEvent) {
    if(e.button === 2) {
      this.gridService.rightDragging = true;
    } else {
      this.gridService.leftDragging = true;
    }
  }

  stopDragging(e: MouseEvent) {
    if(e.button === 2) {
      this.gridService.rightDragging = false;
    } else {
      this.gridService.leftDragging = false;
    }
  }
}
