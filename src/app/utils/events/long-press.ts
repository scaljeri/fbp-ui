const WAIT_TIME = 1000;
const MOVE_THRESHOLD = 20;

export interface IFbpLongPress {
	update: (event: PointerEvent) => void,
	cancel: () => void
}

export const longPress = (start: PointerEvent, cb: (e: PointerEvent) => void): IFbpLongPress => {
	const x = start.clientX;
	const y = start.clientY;
	let event = start;

	const id = setTimeout(() => {
		if (Math.abs(x - event.clientX) < MOVE_THRESHOLD && Math.abs(y - event.clientY) < MOVE_THRESHOLD) {
			cb(event);
		}
	}, WAIT_TIME);

	return {
		update: (move: PointerEvent): void => {
			event = move;
		},
		cancel: () => {
			clearTimeout(id);
		},
	};
}