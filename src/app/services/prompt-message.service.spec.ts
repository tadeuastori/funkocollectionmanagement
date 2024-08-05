import { TestBed } from '@angular/core/testing';

import { PromptMessageService } from './prompt-message.service';

describe('PromptMessageService', () => {
  let service: PromptMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PromptMessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
