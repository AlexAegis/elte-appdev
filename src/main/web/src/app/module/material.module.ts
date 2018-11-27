import {
	MatMenuModule,
	MatIconModule,
	MatCardModule,
	MatSidenavModule,
	MatTooltipModule,
	MatToolbarModule,
	MatButtonModule,
	MatFormFieldModule,
	MatInputModule,
	MatRippleModule,
	ErrorStateMatcher,
	ShowOnDirtyErrorStateMatcher,
	MatProgressSpinnerModule
} from '@angular/material';

import { NgModule } from '@angular/core';

const modules = [
	MatButtonModule,
	MatFormFieldModule,
	MatInputModule,
	MatRippleModule,
	MatMenuModule,
	MatIconModule,
	MatCardModule,
	MatSidenavModule,
	MatTooltipModule,
	MatToolbarModule,
	MatProgressSpinnerModule
];

@NgModule({
	imports: [...modules],
	exports: [...modules],
	providers: [
		{ provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher }
	]
})
export class MaterialModule {}
