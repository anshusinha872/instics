import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintsellerComponent } from './printseller.component';

describe('PrintsellerComponent', () => {
  let component: PrintsellerComponent;
  let fixture: ComponentFixture<PrintsellerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintsellerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrintsellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
