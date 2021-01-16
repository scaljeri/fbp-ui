import { TestBed } from '@angular/core/testing';

import { ElementWrapperService } from './element-wrapper.service';

describe('ElementWrapperService', () => {
  let service: ElementWrapperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ElementWrapperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
