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
  backgroundColor: string = '#181818';
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
    console.log(window.innerWidth);
    this.gridSize = Math.floor(window.innerWidth / 50);
    console.log(this.gridSize);
    this.cells = Array(this.gridSize).fill(0);
  }
}
