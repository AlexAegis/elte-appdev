import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ActivatedRoute } from '@angular/router';
import { slideInAnimation } from 'src/app/animation/route.animation';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss'],
	animations: [slideInAnimation]
})
export class RegisterComponent implements OnInit {
	shouldAnimate: boolean;
	constructor(private route: ActivatedRoute) {
		console.log(`asd ${this.route.outlet}`);
		if (this.route.outlet === 'register') {
			this.shouldAnimate = true; // Yes, I do enter here every time
		}
	}

	ngOnInit() {}
}
