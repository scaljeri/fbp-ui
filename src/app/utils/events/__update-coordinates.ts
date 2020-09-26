
import { IFbpEventState } from '../event-types';

const dndUpdateCoordinates = (event: PointerEvent, state: IFbpEventState): void => {
	const x = event.clientX;
	const y = event.clientY;

	const maxX = state.parentRect.width - state.targetRect.width;
	const maxY = state.parentRect.height - state.targetRect.height;
	state.x = Math.min(maxX, Math.max(0, x - state.offsetX));
	state.y = Math.min(maxY, Math.max(0, y - state.offsetY));
}

export { dndUpdateCoordinates };