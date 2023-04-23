import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostDashboardTableItemComponent } from './post-dashboard-table-item.component';

describe('PostDashboardTableItemComponent', () => {
  let component: PostDashboardTableItemComponent;
  let fixture: ComponentFixture<PostDashboardTableItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostDashboardTableItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PostDashboardTableItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
