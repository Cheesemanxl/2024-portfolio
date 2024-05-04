import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridService } from '../../../../services/grid/grid.service';
import { GridCellComponent } from '../grid-cell/grid-cell.component';

@Component({
  selector: 'app-grid-column',
  standalone: true,
  imports: [
    GridCellComponent,
    CommonModule
  ],
  templateUrl: './grid-column.component.html',
  styleUrl: './grid-column.component.scss'
})
export class GridColumnComponent {

  constructor(public cellService: GridService) {}
}
