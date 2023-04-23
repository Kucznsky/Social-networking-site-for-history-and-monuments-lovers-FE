import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentsDashboardComponent } from './comments-dashboard.component';

describe('CommentsDashboardComponent', () => {
  let component: CommentsDashboardComponent;
  let fixture: ComponentFixture<CommentsDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommentsDashboardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CommentsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
