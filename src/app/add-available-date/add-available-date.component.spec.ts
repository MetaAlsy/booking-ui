import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAvailableDateComponent } from './add-available-date.component';

describe('AddAvailableDateComponent', () => {
  let component: AddAvailableDateComponent;
  let fixture: ComponentFixture<AddAvailableDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddAvailableDateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAvailableDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
