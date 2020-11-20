import { IActiveElement, IFbpInteractionComponent, IFbpInteractionHandlers } from 'src/app/types/interaction';
import { IFbpEventContext, IFbpInteractionState } from '../event-types';

export const SELECTOR = 'fbp-sockets'

export const getSocketContext = (event: PointerEvent, handlers: IFbpInteractionHandlers, interactionComp: IFbpInteractionComponent, active: IActiveElement): IFbpEventContext => {
	return {
		down: (event) => {
			console.log('socket: down');
			return { targets: [active.element] };
		},
		up: (event: PointerEvent, state: IFbpInteractionState): void => {
			// do magic
			console.log('socket up');
			if (handlers.up) {
				handlers.up(state);
			}
		}, 
		longPress: (event) => {
			console.log('socker lp')
			active.longpress(event, active);
		},
		click: (event) => {
			console.log('socket clck');
		}
	};
}
