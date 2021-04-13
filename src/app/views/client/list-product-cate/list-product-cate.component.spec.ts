import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProductCateComponent } from './list-product-cate.component';

describe('ListProductCateComponent', () => {
  let component: ListProductCateComponent;
  let fixture: ComponentFixture<ListProductCateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListProductCateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListProductCateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
