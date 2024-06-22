import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorGridComponent } from './color-grid.component';
import { GridService } from '../../services/grid/grid.service';

describe('ColorGridComponent', () => {
  let component: ColorGridComponent;
  let fixture: ComponentFixture<ColorGridComponent>;
  let gridService: GridService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColorGridComponent],
      providers: [GridService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColorGridComponent);
    component = fixture.componentInstance;
    gridService = TestBed.inject(GridService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('clearGrid', () => {
    it('should clear the background color of all cells', () => {
      const mockNodeList = [
        { style: { backgroundColor: 'red' } },
        { style: { backgroundColor: 'blue' } },
        { style: { backgroundColor: 'green' } },
      ];
      spyOn(document, 'querySelectorAll').and.returnValue(mockNodeList as any);

      component.clearGrid();

      expect(document.querySelectorAll).toHaveBeenCalledWith('.cell');
      expect(mockNodeList[0].style.backgroundColor).toBe(gridService.backgroundColor);
      expect(mockNodeList[1].style.backgroundColor).toBe(gridService.backgroundColor);
      expect(mockNodeList[2].style.backgroundColor).toBe(gridService.backgroundColor);
    });
  });
});
