import { TestBed } from '@angular/core/testing';

import { DragAndDropService } from './interaction.service';

describe('DragAndDropService', () => {
  let service: DragAndDropService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DragAndDropService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
