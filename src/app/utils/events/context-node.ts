import { IActiveElement, IFbpInteractionComponent, IFbpInteractionHandlers } from 'src/app/types/interaction';
import { IFbpEventContext, IFbpInteractionState } from '../event-types';

export const SELECTOR = 'fbp-sockets'

export const isNodeTarget = (event: PointerEvent, interactionComp: IFbpInteractionComponent): boolean => {
	const node = getNodeElement(event);

	return node && node !== interactionComp.element;
}
export const getNodeContext = (event: PointerEvent, interactionComp: IFbpInteractionComponent, active?: IActiveElement, handlers: IFbpInteractionHandlers = {}): IFbpEventContext => {
	const node = getNodeElement(event);

	return {
		down: (event) => {
			console.log('node: down');
			return { targets: [node] };
		},
		up: (event: PointerEvent, state: IFbpInteractionState): void => {
			// do magic
			console.log('node up');
			if (handlers.up) {
				handlers.up(state);
			}
		},
		move: (event: PointerEvent, state: IFbpInteractionState) => {
			node.style.left = state.x + 'px';
			node.style.top = state.y + 'px';
		},
		longPress: (event) => {
			console.log('node lp')
		},
		click: (event) => {
			console.log('node clck');
		}
	};
}

function getNodeElement(event: PointerEvent): HTMLElement {
	return (event.target as HTMLElement).closest('fbp-node') as HTMLElement;
}
