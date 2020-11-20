import { IFbpEventContext, IFbpInteractionState, IFbpPointerDownTargets } from '../event-types';

const pointerDown = (
	event: PointerEvent,
	parent: HTMLElement,
	context: IFbpEventContext): IFbpInteractionState[] => {
	const parentRect = parent.getBoundingClientRect();
	const input = context.down!(event); // TODO: Check if down can be null?
	const states: any = [];
	(input.targets || []).forEach(element => states.push(initializeState(element, event, parentRect)));

	return states;
}

function initializeState(target: HTMLElement, event: PointerEvent, dragRect: DOMRect): IFbpInteractionState {
	const state = {
		parentRect: dragRect,
		startTime: Date.now(),
		startX: event.clientX,
		startY: event.clientY,
	} as IFbpInteractionState;

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