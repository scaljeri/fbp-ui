import { pointerDown } from './pointer-down';
import { pointerMove } from './pointer-move';
import { pointerUp } from './pointer-up';
import { IFbpLongPress, longPress } from './long-press';
import { IFbpEventConnect, IFbpGetContext, IFbpInteractionContext } from '../event-types';

export function monitorEvents(element: HTMLElement, getContext: IFbpGetContext): IFbpEventConnect {
	let longPressHandlers: IFbpLongPress;
	let context: IFbpInteractionContext;

	// const pDownHandler = pointerDown(element, handlers, states);
	// const pMoveHandler = pointerMove(handlers, states);
	// const pUpHandler = pointerUp(handlers, states);

	// const pMoveFn = (event: PointerEvent) => {
	// 	longPressHandlers.update(event);
	// 	pMoveHandler(event);
	// };

	const pDownFn = (event: PointerEvent) => {
		event.stopPropagation();
		context = getContext(event);
		const states = pointerDown(event, element, context);


		const pMoveFn = (event: PointerEvent) => {
			longPressHandlers.update(event);
			pointerMove(event, context, states);
		};


		longPressHandlers = longPress(event, (event: PointerEvent) => {
			// longpress
			console.log('LongPress');
			pUpFn(event);

		});

		const pUpFn = (event: PointerEvent) => {
			event.stopPropagation();
			longPressHandlers.cancel();
			pointerUp(event, context, states);

			element.removeEventListener('pointermove', pMoveFn);
			element.removeEventListener('pointerup', pUpFn);
			element.removeEventListener('pointerleave', pUpFn);
		};

		element.addEventListener('pointermove', pMoveFn);
		element.addEventListener('pointerup', pUpFn);
		element.addEventListener('pointerleave', pUpFn);
	};

	// const pUpFn = (event: PointerEvent) => {
	// 	event.stopPropagation();
	// 	longPressHandlers.cancel();
	// 	pUpHandler(event);

	// 	element.removeEventListener('pointermove', pMoveFn);
	// 	element.removeEventListener('pointerup', pUpFn);
	// 	element.removeEventListener('pointerleave', pUpFn);
	// };

	element.addEventListener('pointerdown', pDownFn);
	const disconnect = () => {
		element.removeEventListener('pointerdown', pDownFn);
		// element.removeEventListener('pointermove', pMoveFn);
		// element.removeEventListener('pointerup', pUpFn);
		// element.removeEventListener('pointerleave', pUpFn);
	};
	return { disconnect };
}