import { TestBed } from '@angular/core/testing';

import { EditCartService } from './edit-cart.service';

describe('EditCartService', () => {
  let service: EditCartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditCartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
