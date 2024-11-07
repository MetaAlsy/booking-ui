import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfermBookingComponent } from './conferm-booking.component';

describe('ConfermBookingComponent', () => {
  let component: ConfermBookingComponent;
  let fixture: ComponentFixture<ConfermBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfermBookingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfermBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
