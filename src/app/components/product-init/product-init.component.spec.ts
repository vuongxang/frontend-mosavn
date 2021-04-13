import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductInitComponent } from './product-init.component';

describe('ProductInitComponent', () => {
  let component: ProductInitComponent;
  let fixture: ComponentFixture<ProductInitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductInitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductInitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
