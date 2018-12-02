import { Component, OnInit, Input } from '@angular/core';
import { ObservableMedia, MediaChange } from '@angular/flex-layout';
import { AuthService } from 'src/app/service/auth.service';

@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
	over: string = 'side';
	expandHeight: string = '42px';
	collapseHeight: string = '42px';
	displayMode: string = 'flat';

	@Input()
	disabled: boolean = false;

	opened: boolean = false;

	constructor(private media: ObservableMedia, public auth: AuthService) {
		this.auth.login$.subscribe(user => {
			if (!user) {
				this.opened = false;
			}
		});
	}

	ngOnInit(): void {
		this.media.subscribe((change: MediaChange) => {
			if (change.mqAlias === 'sm' || change.mqAlias === 'xs') {
				this.opened = false;
				this.over = 'over';
			} else {
				this.opened = true;
				this.over = 'side';
			}
		});
	}

	onCloseStart(): void {
		this.opened = false;
	}
}
