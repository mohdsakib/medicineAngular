import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenrateBillComponent } from './genrate-bill.component';

describe('GenrateBillComponent', () => {
  let component: GenrateBillComponent;
  let fixture: ComponentFixture<GenrateBillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenrateBillComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenrateBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
