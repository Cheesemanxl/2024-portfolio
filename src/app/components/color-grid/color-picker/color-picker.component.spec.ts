import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ColorPickerComponent } from './color-picker.component';
import { GridService } from '../../../services/grid/grid.service';

describe('ColorPickerComponent', () => {
  let component: ColorPickerComponent;
  let fixture: ComponentFixture<ColorPickerComponent>;
  let gridService: GridService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColorPickerComponent],
      providers: [GridService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColorPickerComponent);
    component = fixture.componentInstance;
    gridService = TestBed.inject(GridService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngAfterViewInit', () => {
    it('should add selected-option class to elements with default color', () => {
      const bgColor: string = 'background-color: ' + gridService.color + ';';

      const mockNodeList = [
        { getAttribute: () => bgColor , classList: { add: jasmine.createSpy('add') } },
        { getAttribute: () => 'background-color: blue;', classList: { add: jasmine.createSpy('add') } },
        { getAttribute: () => 'background-color: green;', classList: { add: jasmine.createSpy('add') } },
      ];
      spyOn(document, 'querySelectorAll').and.returnValue(mockNodeList as any);

      component.ngAfterViewInit();

      expect(document.querySelectorAll).toHaveBeenCalledWith('div.color-option');
      expect(mockNodeList[0].classList.add).toHaveBeenCalledWith('selected-option');
      expect(mockNodeList[1].classList.add).not.toHaveBeenCalled();
      expect(mockNodeList[2].classList.add).not.toHaveBeenCalled();
    });
  });

  describe('onOptionClicked', () => {
    it('should add selected-option class and set color in gridService', () => {
      const div = fixture.nativeElement.querySelector('div.color-option');
      div.dispatchEvent(new MouseEvent('click'));

      expect(div.classList.contains('selected-option')).toBe(true);
      expect(gridService.color).toBe('white');
    });
  });
});
