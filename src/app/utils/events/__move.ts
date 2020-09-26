import { dndMoveElement } from './__move-element';
import { IFbpPointerHandlers, IDragAndDropState } from '../event-types';
import { dndUpdateCoordinates } from './__update-coordinates';

const dndPointerMove = (handlers: IFbpPointerHandlers, states: IDragAndDropState[]): (e: PointerEvent) => void => {
	return (event: PointerEvent): void => {
		states.forEach(state => {
			if (state.target) {
				dndUpdateCoordinates(event, state);
				dndMoveElement(state);

			}
		});

		if (handlers.pointerMove) {
			handlers.pointerMove(event);
		}
	}
}

export { dndPointerMove }