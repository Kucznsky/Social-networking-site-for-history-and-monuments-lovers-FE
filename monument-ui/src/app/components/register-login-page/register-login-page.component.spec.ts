import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterLoginPageComponent } from './register-login-page.component';

describe('RegisterLoginPageComponent', () => {
  let component: RegisterLoginPageComponent;
  let fixture: ComponentFixture<RegisterLoginPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterLoginPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterLoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
