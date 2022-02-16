import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescagasComponent } from './descagas.component';

describe('DescagasComponent', () => {
  let component: DescagasComponent;
  let fixture: ComponentFixture<DescagasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DescagasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DescagasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
