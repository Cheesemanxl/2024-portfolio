import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { GridService } from './grid.service';
import { fakeAsync, tick } from '@angular/core/testing';

// Mock Component to provide an element with ViewChild
@Component({
  template: `<div #gridFrame style="width: 500px; height: 520px;"></div>`,
})
class TestComponent {
  @ViewChild('gridFrame', { static: false }) gridFrame!: ElementRef;
}

describe('GridService', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let gridService: GridService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestComponent],
      providers: [GridService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    gridService = TestBed.inject(GridService);
    fixture.detectChanges();

    gridService.gridFrame = component.gridFrame;
  });

  describe('ngAfterViewInit', () => {
    it('should initialize grid size correctly', () => {
      window.innerWidth = 1400;
      window.innerHeight = 1200;

      gridService.ngAfterViewInit();

      expect(gridService.gridWidth).toEqual(28);
      expect(gridService.gridHeight).toEqual(21);

      expect(gridService.columns.length).toBe(gridService.gridWidth);

      expect(gridService.rows.length).toBe(gridService.gridHeight);
    });
  });

  describe('constructor', () => {
    it('should update grid size correctly on window resize', fakeAsync(() => {
      spyOn(gridService, 'updateGridSize').and.callThrough();

      window.innerWidth = 1000;
      window.innerHeight = 800;
      window.dispatchEvent(new Event('resize'));

      tick(300);

      expect(gridService.updateGridSize).toHaveBeenCalled();
      expect(gridService.gridWidth).toBe(20);
      expect(gridService.gridHeight).toBe(13);
    }));
  });

  describe('updateGridSize', () => {
    it('should update grid size correctly', () => {
      window.innerWidth = 800;
      window.innerHeight = 600;
      gridService.updateGridSize();

      expect(gridService.gridWidth).toBe(16);
      expect(gridService.gridHeight).toBe(9);
      expect(gridService.columns.length).toBe(16);
      expect(gridService.rows.length).toBe(9);
    });
  });
});
