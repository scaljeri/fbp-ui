import { IFbpPosition } from '@scaljeri/fbp-core';
import { dndMoveElement } from './move-element';
import { IDragAndDropState, IFbpPointerHandlers } from './types';
import { dndUpdateCoordinates } from './update-coordinates';

const dndPointerUp = (handlers: IFbpPointerHandlers, states: IDragAndDropState[]): (e: PointerEvent) => void => {
	return (event: PointerEvent): void => {
		let isUpHandlerCalled = false;

		states.forEach(state => {
			if (state.target) {
				dndUpdateCoordinates(event, state);
				dndMoveElement(state);

				isUpHandlerCalled = true;

				if (handlers.pointerUp) {
					handlers.pointerUp(coordinateToPercentage(state), event, state.target);
				}
			}
		});

		if (!isUpHandlerCalled && handlers.pointerUp) {
			handlers.pointerUp(coordinateToPercentage(states[0]), event);
		}
	};
}

function coordinateToPercentage(state: IDragAndDropState): IFbpPosition {
	// To percentage
	const left = (100 * state.x) / state.dragRect.width;
	const top = (100 * state.y) / state.dragRect.height;

	// state.child.style.left = `${left}%`;
	// state.child.style.top = `${top}%`;

	return { left, top };
}

export { dndPointerUp };