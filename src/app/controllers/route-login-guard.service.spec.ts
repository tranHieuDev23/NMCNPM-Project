import { TestBed } from '@angular/core/testing';

import { RouteLoginGuardService } from './route-login-guard.service';

describe('RouteLoginGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RouteLoginGuardService = TestBed.get(RouteLoginGuardService);
    expect(service).toBeTruthy();
  });
});
