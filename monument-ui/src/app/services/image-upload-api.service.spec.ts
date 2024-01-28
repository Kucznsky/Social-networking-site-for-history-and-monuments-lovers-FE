import { TestBed } from '@angular/core/testing';

import { ImageUploadApiService } from './image-upload-api.service';

describe('ImageUploadApiService', () => {
  let service: ImageUploadApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImageUploadApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
