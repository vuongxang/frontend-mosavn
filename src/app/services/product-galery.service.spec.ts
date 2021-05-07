import { TestBed } from '@angular/core/testing';

import { ProductGaleryService } from './product-galery.service';

describe('ProductGaleryService', () => {
  let service: ProductGaleryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductGaleryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
