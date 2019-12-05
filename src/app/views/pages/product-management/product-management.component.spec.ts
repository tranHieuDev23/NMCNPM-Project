import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductManagementPageComponent } from './product-management.component';

describe('ProductManagementComponent', () => {
  let component: ProductManagementPageComponent;
  let fixture: ComponentFixture<ProductManagementPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductManagementPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductManagementPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
