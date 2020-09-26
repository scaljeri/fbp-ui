import { IFbpPointerEventHandlers, IFbpEventState } from '../event-types';

export const pointerMove = (handlers: IFbpPointerEventHandlers, states: IFbpEventState[]): (e: PointerEvent) => void => {
	return (event: PointerEvent): void => {
		event.stopPropagation();

		states.forEach(state => {
			if (state.target) {
				updateCoordinates(event, state);
			}

			if (handlers.move) {
				handlers.move(event, state);
			}
		});
	}
}

const updateCoordinates = (event: PointerEvent, state: IFbpEventState): void => {
	const x = event.clientX;
	const y = event.clientY;

	const maxX = state.parentRect.width - state.targetRect.width;
	const maxY = state.parentRect.height - state.targetRect.height;
	state.x = Math.min(maxX, Math.max(0, x - state.offsetX));
	state.y = Math.min(maxY, Math.max(0, y - state.offsetY));
}
