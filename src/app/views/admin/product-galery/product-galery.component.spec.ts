import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductGaleryComponent } from './product-galery.component';

describe('ProductGaleryComponent', () => {
  let component: ProductGaleryComponent;
  let fixture: ComponentFixture<ProductGaleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductGaleryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductGaleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
