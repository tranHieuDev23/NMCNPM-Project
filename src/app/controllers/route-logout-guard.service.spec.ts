import { TestBed } from '@angular/core/testing';

import { RouteLogoutGuardService } from './route-logout-guard.service';

describe('RouteLogoutGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RouteLogoutGuardService = TestBed.get(RouteLogoutGuardService);
    expect(service).toBeTruthy();
  });
});
