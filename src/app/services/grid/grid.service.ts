import { Injectable } from '@angular/core';

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

  constructor() { }
}
