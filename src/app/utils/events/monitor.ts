import { pointerDown } from './pointer-down';
import { pointerMove } from './pointer-move';
import { pointerUp } from './pointer-up';
import { IFbpEventConnect, IFbpEventState, IFbpPointerEventHandlers } from '../event-types';

export function monitorEvents(element: HTMLElement, handlers: IFbpPointerEventHandlers = {}): IFbpEventConnect {
	const state: IFbpEventState[] = [];

	const pDownHandler = pointerDown(element, handlers, state);
	const pMoveFn = pointerMove(handlers, state);
	const pUpFn = pointerUp(handlers, state);
	// Only start monitoring movements on 'pointerdown'
	const pDownFn = (event: PointerEvent) => {
		event.stopPropagation();

		pDownHandler(event);

		element.addEventListener('pointermove', pMoveFn);
		element.addEventListener('pointerup', pUpFn);
		element.removeEventListener('pointerleave', pUpFn);
	};

	element.addEventListener('pointerdown', pDownFn);

	return {
		disconnect: () => {
			element.removeEventListener('pointerdown', pDownFn);
			element.removeEventListener('pointermove', pMoveFn);
			element.removeEventListener('pointerup', pUpFn);
			element.removeEventListener('pointerleave', pUpFn);
		}
	};
}