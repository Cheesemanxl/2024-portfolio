import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CategoryDeleteConfirmDialogComponent } from './category-delete-confirm-dialog.component';
import { Category } from '../../../interfaces/category';

describe('CategoryDeleteConfirmDialogComponent', () => {
  let component: CategoryDeleteConfirmDialogComponent;
  let fixture: ComponentFixture<CategoryDeleteConfirmDialogComponent>;

  const mockCategory: Category = {
    id: 0,
    type: 'category',
    title: 'Mock Category',
    tasks: []
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CategoryDeleteConfirmDialogComponent,
        MatDialogModule
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: mockCategory },
        { provide: MatDialogRef, useValue: {} }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryDeleteConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
