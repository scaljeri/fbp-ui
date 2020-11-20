import { pointerDown } from './pointer-down';
import { pointerMove } from './pointer-move';
import { pointerUp } from './pointer-up';
import { IFbpLongPress, longPress } from './long-press';
import { IFbpEventConnect, IFbpEventContext, IFbpGetContext } from '../event-types';

export function monitorEvents(element: HTMLElement, getContext: IFbpGetContext): IFbpEventConnect {
	let longPressHandlers: IFbpLongPress;
	let context: IFbpEventContext;

	const pDownFn = (event: PointerEvent) => {
		event.stopPropagation();
		context = getContext(event);
		const states = pointerDown(event, element, context);


		const pMoveFn = (event: PointerEvent) => {
			longPressHandlers.update(event);
			pointerMove(event, context, states);
		};


		longPressHandlers = longPress(event, (event: PointerEvent) => {
			context.longPress && context.longPress(event, states);
			pUpFn(event); // clear
		});

		const pUpFn = (event: PointerEvent) => {
			event.stopPropagation();

			// Click detected
			if (longPressHandlers.isPressOnGoing() && longPressHandlers.duration() < 200) {
				context.click && context.click(event, states);
			} 

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

	element.addEventListener('pointerdown', pDownFn);
	const disconnect = () => {
		element.removeEventListener('pointerdown', pDownFn);
	};
	return { disconnect };
}