import { MOVE_THRESHOLD, WAIT_TIME } from './constants';

export interface IFbpLongPress {
	update: (event: PointerEvent) => void,
	cancel: () => void,
	isPressOnGoing: () => boolean,
	duration: () => number
}

export const longPress = (start: PointerEvent, cb: (e: PointerEvent) => void): IFbpLongPress => {
	const x = start.clientX;
	const y = start.clientY;
	const starttime = Date.now();
	let event = start;

	let id = window.setTimeout(() => {
		id = -1;
		if (isClick(x, y, event)) {
			cb(event);
		}
	}, WAIT_TIME);

	return {
		update: (move: PointerEvent): void => {
			event = move;
		},
		cancel: () => {
			window.clearTimeout(id);
			id = -1;
		},
		isPressOnGoing: () => id >= 0 && isClick(x, y, event),
		duration: () => Date.now() - starttime
	};
}

function isClick(x: number, y: number, event: PointerEvent): boolean {
	return Math.abs(x - event.clientX) < MOVE_THRESHOLD && Math.abs(y - event.clientY) < MOVE_THRESHOLD;
}