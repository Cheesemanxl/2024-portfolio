import { Injectable } from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GridService {

  gridSize: number = 25;
  cells: number[] = Array(this.gridSize).fill(0);
  color: string = 'white';
  backgroundColor: string = '#101010';
  leftDragging: boolean = false;
  rightDragging: boolean = false;

  constructor() {
    this.updateGridSize();

    fromEvent(window, 'resize').pipe(
      debounceTime(200)
    ).subscribe(() => {
      this.updateGridSize();
    });
  }

  private updateGridSize() {
    this.gridSize = Math.floor(window.innerWidth / 50);
    this.cells = Array(this.gridSize).fill(0);
  }
}
