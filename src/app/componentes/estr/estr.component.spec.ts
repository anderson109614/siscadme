import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstrComponent } from './estr.component';

describe('EstrComponent', () => {
  let component: EstrComponent;
  let fixture: ComponentFixture<EstrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
