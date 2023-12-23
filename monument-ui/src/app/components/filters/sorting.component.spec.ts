import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortComponent } from './sorting.component';

describe('FiltersComponent', () => {
  let component: SortComponent;
  let fixture: ComponentFixture<SortComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SortComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
