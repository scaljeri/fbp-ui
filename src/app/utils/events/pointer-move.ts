import { IFbpEventContext, IFbpInteractionState } from '../event-types';

const pointerMove = (event: PointerEvent, context: IFbpEventContext, states: IFbpInteractionState[]): void => {
	event.stopPropagation();

	states.forEach(state => {
		if (state.target) {
			updateCoordinates(event, state);
		}

		if (context.move) {
			context.move(event, state);
		}
	});
}

export { pointerMove };

const updateCoordinates = (event: PointerEvent, state: IFbpInteractionState): void => {
	const x = event.clientX;
	const y = event.clientY;

	const maxX = state.parentRect.width - state.targetRect!.width; // TODO: is it possible that targetRect is undefined?
	const maxY = state.parentRect.height - state.targetRect!.height;
	state.x = Math.min(maxX, Math.max(0, x - state.offsetX!));
	state.y = Math.min(maxY, Math.max(0, y - state.offsetY!));
}
