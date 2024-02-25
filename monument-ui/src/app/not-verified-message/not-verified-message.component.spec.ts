import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotVerifiedMessageComponent } from './not-verified-message.component';

describe('NotVerifiedMessageComponent', () => {
  let component: NotVerifiedMessageComponent;
  let fixture: ComponentFixture<NotVerifiedMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NotVerifiedMessageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NotVerifiedMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
