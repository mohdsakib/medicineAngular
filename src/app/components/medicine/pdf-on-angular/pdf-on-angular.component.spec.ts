import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfOnAngularComponent } from './pdf-on-angular.component';

describe('PdfOnAngularComponent', () => {
  let component: PdfOnAngularComponent;
  let fixture: ComponentFixture<PdfOnAngularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PdfOnAngularComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfOnAngularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
