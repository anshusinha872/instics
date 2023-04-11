import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaundryadminComponent } from './laundryadmin.component';

describe('LaundryadminComponent', () => {
  let component: LaundryadminComponent;
  let fixture: ComponentFixture<LaundryadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LaundryadminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LaundryadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
