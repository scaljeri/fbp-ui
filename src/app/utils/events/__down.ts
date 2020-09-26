import { IFbpPointerHandlers, IDragAndDropState } from '../event-types';

const dndPointerDown = (element: HTMLElement, handlers: IFbpPointerHandlers, state: IDragAndDropState[]): (e: PointerEvent) => void => {
	return (event: PointerEvent): void => {

		const { target, targets, ghost } = handlers.pointerDown(event);
		const dragRect = element.getBoundingClientRect();

		state.length = 0;
		state[0] = {} as IDragAndDropState;

		if (targets) {
			target.forEach((target, index) => {
				state[index] = {} as IDragAndDropState;
				initializeState(target, state[index], event, dragRect);
			});
		} else if (ghost) {
			initializeState(ghost, state[0], event, dragRect);
		} else {
			initializeState(target, state[0], event, dragRect)
		}
	}
}

function initializeState(target: HTMLElement, state: Partial<IDragAndDropState>, event: PointerEvent, dragRect: DOMRect): void {
	state.dragRect = dragRect;
	state.startTime = Date.now();
	state.startX = event.clientX;
	state.startY = event.clientY;
	state.target = target;

	if (target) {
		const targetRect = target.getBoundingClientRect();

		state.targetRect = targetRect;
		state.initStartX = target.style.left;
		state.initStartY = target.style.top;
		state.offsetX = event.clientX - targetRect.x + dragRect.x;
		state.offsetY = event.clientY - targetRect.y + dragRect.y;
	} 
}

export { dndPointerDown }