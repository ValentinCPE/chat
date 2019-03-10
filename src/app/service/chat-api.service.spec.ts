import { TestBed } from '@angular/core/testing';

import { ChatApiService } from './chat-api.service';

describe('ChatApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChatApiService = TestBed.get(ChatApiService);
    expect(service).toBeTruthy();
  });
});
