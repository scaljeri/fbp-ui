import { pointerDown } from './pointer-down';
import { pointerMove } from './pointer-move';
import { pointerUp } from './pointer-up';
import { IFbpEventConnect, IFbpEventState, IFbpPointerEventHandlers } from '../event-types';

export function monitorEvents(element: HTMLElement, handlers: IFbpPointerEventHandlers = {}): IFbpEventConnect {
	const states: IFbpEventState[] = [];

	const pDownHandler = pointerDown(element, handlers, states);
	const pMoveFn = pointerMove(handlers, states);
	const pUpHandler = pointerUp(handlers, states);
	// Only start monitoring movements on 'pointerdown'
	const pDownFn = (event: PointerEvent) => {
		event.stopPropagation();

		pDownHandler(event);

		element.addEventListener('pointermove', pMoveFn);
		element.addEventListener('pointerup', pUpFn);
		element.addEventListener('pointerleave', pUpFn);
	};

	const pUpFn = (event: PointerEvent) => {
		event.stopPropagation();
		pUpHandler(event);

		element.removeEventListener('pointermove', pMoveFn);
		element.removeEventListener('pointerup', pUpFn);
		element.removeEventListener('pointerleave', pUpFn);
	};

	element.addEventListener('pointerdown', pDownFn);
	const disconnect = () => {
			element.removeEventListener('pointerdown', pDownFn);
			element.removeEventListener('pointermove', pMoveFn);
			element.removeEventListener('pointerup', pUpFn);
			element.removeEventListener('pointerleave', pUpFn);
	};
	return { disconnect };
}