import { Injectable } from '@angular/core';
import { FbpElementNames, IActiveElement, IFbpInteractionModel } from '../types/interaction';
import { IFbpEventConnect, IFbpPointerDownTargets } from '../utils/event-types';
import { monitorEvents } from '../utils/events/monitor';

export interface PointerEventsHandler {
	updatePosition(x: number, y: number): void;
	pointerDown(event: PointerEvent): HTMLElement;
}

@Injectable({
	providedIn: 'root'
})
export class InteractionService {
	private nodes: IFbpInteractionModel[] = [];
	private connection: IFbpEventConnect;
	private active: IActiveElement;

	activate(component: IFbpInteractionModel): void {
		if (this.connection) {
			this.connection.disconnect();
		}

		this.nodes.push(component);
		this.startMonitoring(component);
	}

	deactivate(component: IFbpInteractionModel): void {
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

	on(active: any): void {

	}

	isSocketActive(): boolean {
		return this.active ? this.active.name === FbpElementNames.socket : false;
	}

	startMonitoring(component: IFbpInteractionModel): void {
		this.connection = monitorEvents(component.element.nativeElement, {
			down: (event: PointerEvent): IFbpPointerDownTargets => {
				if (this.isSocketActive()) {
					return { target: this.active.element, ghost: component.socketGhost.nativeElement }
				}
			}
		});
	}
}


