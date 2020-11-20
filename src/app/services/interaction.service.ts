import { Injectable, NgZone } from '@angular/core';
import { IActiveElement, IFbpInteractionComponent } from '../types/interaction';
import { IFbpEventConnect } from '../utils/event-types';
import { monitorEvents } from '../utils/events/monitor';
import { FbpInteractionContexts } from '../constants/interaction';
import { getSocketContext } from '../utils/events/context-socket';
import { getNodeContext, isNodeTarget } from '../utils/events/context-node';

export interface PointerEventsHandler {
	updatePosition(x: number, y: number): void;
	pointerDown(event: PointerEvent): HTMLElement;
}

@Injectable({
	providedIn: 'root'
})
export class InteractionService {
	private nodes: IFbpInteractionComponent[] = [];
	private connection!: IFbpEventConnect;
	private active!: IActiveElement | null;

	constructor(private ngZone: NgZone) { }

	activate(component: IFbpInteractionComponent): void {
		if (this.connection) {
			this.connection.disconnect();
		}

		this.nodes.push(component);
		this.startMonitoring(component);
	}

	deactivate(component: IFbpInteractionComponent): void {
		let last = this.nodes.pop();
		if (component !== last) {
			console.error('InteractionService#off: element to be removed does not match last element in active-node-list');
		}

		this.connection.disconnect();

		last = this.nodes[this.nodes.length - 1];
		if (last) {
			this.startMonitoring(last);
		}
	}

	on(active: IActiveElement): void {
		// 
		this.active = active;
	}

	startMonitoring(component: IFbpInteractionComponent): void {
		let dragEl: HTMLElement;

		this.ngZone.runOutsideAngular(() => {
			this.connection = monitorEvents(component.element, (event: PointerEvent) => {
				let context: any; // TODO

				if (this.active) {
					switch (this.active.context) {
						case FbpInteractionContexts.socket:
							context = getSocketContext(event, { up: () =>  this.reset(event)}, component, this.active );
							break;
					}

				} else if (isNodeTarget(event, component)) {
					context = getNodeContext(event, component, this.active!);
				}


				// const target = (event.target as HTMLElement).closest('fbp-node') as HTMLElement;
				// return {
				// 	targets: [target],
				// 	move: (event: PointerEvent, state: IFbpInteractionState): void => {
				// 		target.style.left = state.x + 'px';
				// 		target.style.top = state.y + 'px';
				// 	}
				// }

				return context;
			});
		});
	}

	reset(event: PointerEvent): void {
		this.active = null;
	}
}


