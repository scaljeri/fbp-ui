import { Injectable } from '@angular/core';
import { IFbpEventConnect } from '../utils/event-types';
import { monitorEvents } from '../utils/events/monitor';

export interface PointerEventsHandler {
	updatePosition(x: number, y: number): void;
	pointerDown(event: PointerEvent): HTMLElement;
}

interface IActiveNode {
	element: HTMLElement
}

@Injectable({
	providedIn: 'root'
})
export class InteractionService {
	private nodes: IActiveNode[] = [];
	private activeConnection: IFbpEventConnect;

	on(element: HTMLElement): void {
		if (this.activeConnection) {
			this.activeConnection.disconnect();
		}

		this.activeConnection = monitorEvents(element, {
			down: event => {
				// Check welk element er gesleept gaat worden
			}
		});
		this.nodes.push({element});
		this.startMonitoring(element);
	}

	off(element: HTMLElement): void {
		let last = this.nodes.pop();
		if (element !== last.element) {
			console.error('InteractionService#off: element to be removed does not match last element in active-node-list', element, last.element);
		}

		this.activeConnection.disconnect();

		last = this.nodes[this.nodes.length - 1];
		if (last) {
			this.startMonitoring(last.element);
		}
	}

	startMonitoring(element): void {
		this.activeConnection = monitorEvents(element, {});

	}
}

