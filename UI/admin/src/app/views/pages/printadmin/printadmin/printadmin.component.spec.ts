import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintadminComponent } from './printadmin.component';

describe('PrintadminComponent', () => {
  let component: PrintadminComponent;
  let fixture: ComponentFixture<PrintadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintadminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrintadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
