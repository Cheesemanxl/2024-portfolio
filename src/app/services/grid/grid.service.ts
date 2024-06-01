import { ElementRef, Injectable, ViewChild, AfterViewInit } from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GridService implements AfterViewInit {

  @ViewChild('gridFrame', { static: false }) gridFrame!: ElementRef;

  gridWidth: number = 0;
  gridHeight: number = 0;
  columns: number[] = [];
  rows: number[] = [];
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

  ngAfterViewInit() {
    this.gridWidth = Math.floor(this.gridFrame.nativeElement.offsetWidth / 50);
    this.gridHeight = Math.floor(this.gridFrame.nativeElement.offsetHeight / 52);
    this.columns = Array(this.gridWidth).fill(0);
    this.rows = Array(this.gridHeight).fill(0);
    this.updateGridSize();
  }

  private updateGridSize(): void {
    this.gridWidth = Math.floor(window.innerWidth / 50);
    this.gridHeight = Math.floor((window.innerHeight - 100) / 52);
    this.columns = Array(this.gridWidth).fill(0);
    this.rows = Array(this.gridHeight).fill(0);
  }
}
