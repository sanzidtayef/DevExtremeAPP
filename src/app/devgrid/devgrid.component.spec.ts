import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevgridComponent } from './devgrid.component';

describe('DevgridComponent', () => {
  let component: DevgridComponent;
  let fixture: ComponentFixture<DevgridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevgridComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DevgridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
