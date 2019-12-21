import { TestBed } from '@angular/core/testing';

import { RouteAdminGuardService } from './route-admin-guard.service';

describe('RouteAdminGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RouteAdminGuardService = TestBed.get(RouteAdminGuardService);
    expect(service).toBeTruthy();
  });
});
