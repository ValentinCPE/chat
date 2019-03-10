import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordRoomComponent } from './password-room.component';

describe('PasswordRoomComponent', () => {
  let component: PasswordRoomComponent;
  let fixture: ComponentFixture<PasswordRoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasswordRoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
