import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GridCellComponent } from './grid-cell.component';
import { GridService } from '../../../services/grid/grid.service';

describe('GridCellComponent', () => {
  let component: GridCellComponent;
  let fixture: ComponentFixture<GridCellComponent>;
  let gridService: GridService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GridCellComponent],
      providers: [GridService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GridCellComponent);
    component = fixture.componentInstance;
    gridService = TestBed.inject(GridService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('paintTile', () => {
    it('should change background color if different from grid service color', () => {
      const div = fixture.nativeElement.querySelector('div.cell');
      div.style.backgroundColor = 'red';
      gridService.color = 'blue';

      div.dispatchEvent(new MouseEvent('click'));
      expect(div.style.backgroundColor).toBe('blue');
    });

    it('should not change background color if same as grid service color', () => {
      const div = fixture.nativeElement.querySelector('div.cell');
      div.style.backgroundColor = 'blue';
      gridService.color = 'blue';

      div.dispatchEvent(new MouseEvent('click'));
      expect(div.style.backgroundColor).toBe('blue');
    });
  });

  describe('resetTile', () => {
    it('should change background color if different from grid service background color', () => {
      const div = fixture.nativeElement.querySelector('div.cell');
      div.style.backgroundColor = 'red';
      gridService.backgroundColor = 'blue';

      div.dispatchEvent(new MouseEvent('contextmenu'));
      expect(div.style.backgroundColor).toBe('blue');
    });

    it('should not change background color if same as grid service bakcground color', () => {
      const div = fixture.nativeElement.querySelector('div.cell');
      div.style.backgroundColor = 'blue';
      gridService.backgroundColor = 'blue';

      div.dispatchEvent(new MouseEvent('contextmenu'));
      expect(div.style.backgroundColor).toBe('blue');
    });
  });

  describe('dragoverTile', () => {
    it('should prevent default and call paintTile when leftDragging', () => {
      const event = new MouseEvent('dragover');
      spyOn(event, 'preventDefault');
      spyOn(component, 'paintTile');

      gridService.leftDragging = true;
      gridService.rightDragging = false;

      component.dragoverTile(event);

      expect(event.preventDefault).toHaveBeenCalled();
      expect(component.paintTile).toHaveBeenCalledWith(event);
    });

    it('should prevent default and call resetTile when rightDragging', () => {
      const event = new MouseEvent('dragover');
      spyOn(event, 'preventDefault');
      spyOn(component, 'resetTile');

      gridService.leftDragging = false;
      gridService.rightDragging = true;

      component.dragoverTile(event);

      expect(event.preventDefault).toHaveBeenCalled();
      expect(component.resetTile).toHaveBeenCalledWith(event);
    });

    it('should prevent default and not call paintTile or resetTile when not leftDragging or rightDragging', () => {
      const event = new MouseEvent('dragover');
      spyOn(event, 'preventDefault');
      spyOn(component, 'paintTile');
      spyOn(component, 'resetTile');

      gridService.leftDragging = false;
      gridService.rightDragging = false;

      component.dragoverTile(event);

      expect(event.preventDefault).toHaveBeenCalled();
      expect(component.paintTile).not.toHaveBeenCalled();
      expect(component.resetTile).not.toHaveBeenCalled();
    });
  });

  describe('onRightClick', () => {
    it('should prevent default and call resetTile', () => {
      const event = new MouseEvent('contextmenu');
      spyOn(event, 'preventDefault');
      spyOn(component, 'resetTile');

      component.onRightClick(event);

      expect(event.preventDefault).toHaveBeenCalled();
      expect(component.resetTile).toHaveBeenCalledWith(event);
    });
  });

  describe('startDragging', () => {
    it('should set rightDragging to true if right mouse button is clicked', () => {
      const event = new MouseEvent('mousedown', { button: 2 });

      component.startDragging(event);

      expect(gridService.rightDragging).toBe(true);
      expect(gridService.leftDragging).toBe(false);
    });

    it('should set leftDragging to true if left mouse button is clicked', () => {
      const event = new MouseEvent('mousedown', { button: 0 });

      component.startDragging(event);

      expect(gridService.leftDragging).toBe(true);
      expect(gridService.rightDragging).toBe(false);
    });
  });

  describe('stopDragging', () => {
    it('should set only rightDragging to false if right mouse button is released', () => {
      const event = new MouseEvent('mouseup', { button: 2 });
      gridService.leftDragging = true;

      component.stopDragging(event);

      expect(gridService.rightDragging).toBe(false);
      expect(gridService.leftDragging).toBe(true);
    });

    it('should set only leftDragging to false if left mouse button is released', () => {
      const event = new MouseEvent('mouseup', { button: 0 });
      gridService.rightDragging = true;

      component.stopDragging(event);

      expect(gridService.leftDragging).toBe(false);
      expect(gridService.rightDragging).toBe(true);
    });
  });
});
