import { TestBed, async, inject } from '@angular/core/testing';

import { LibreGuard } from './libre.guard';

describe('LibreGuardGuard', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [LibreGuard]
		});
	});

	it('should ...', inject([LibreGuard], (guard: LibreGuard) => {
		expect(guard).toBeTruthy();
	}));
});
