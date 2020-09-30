import { IFbpEventState, IFbpPointerEventHandlers } from '../event-types';

const pointerDown = (
	parent: HTMLElement,
	handlers: IFbpPointerEventHandlers,
	states: IFbpEventState[]): (e: PointerEvent) => void => {
		
	return (event: PointerEvent): void => {

		const output = handlers.down ? handlers.down(event) || {} : {};
		const parentRect = parent.getBoundingClientRect();

		states.length = 0;
		(output.targets || [output.target]).forEach(element => states.push(initializeState(element, event, parentRect)));
	};
}

function initializeState(target: HTMLElement, event: PointerEvent, dragRect: DOMRect): IFbpEventState {
	const state = {
		parentRect: dragRect,
		startTime: Date.now(),
		startX: event.clientX,
		startY: event.clientY,
	} as IFbpEventState;

	if (target) {
		const targetRect = target.getBoundingClientRect();

		state.target = target
		state.targetRect = targetRect;
		state.initStartX = target.style.left;
		state.initStartY = target.style.top;
		state.offsetX = event.clientX - targetRect.x + dragRect.x;
		state.offsetY = event.clientY - targetRect.y + dragRect.y;
	}

	return state;
}

export { pointerDown }