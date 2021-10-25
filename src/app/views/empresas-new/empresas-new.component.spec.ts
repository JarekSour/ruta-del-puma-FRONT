import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresasNewComponent } from './empresas-new.component';

describe('EmpresasNewComponent', () => {
  let component: EmpresasNewComponent;
  let fixture: ComponentFixture<EmpresasNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpresasNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpresasNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
