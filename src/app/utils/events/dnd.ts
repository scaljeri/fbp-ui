import { state } from '@angular/animations';

export interface IFbpDnD {

}

export const dnd = (start: PointerEvent, states: IFbpEventState[], ghost?: HTMLElement): void => {
	if (ghost) {
		updatePosition(ghost, state[0].x, state[0].y)
	} else {
		states.forEach(state => {
			updatePosition(state.target, state.x, state.y)
		});
	}
}

function updatePosition(el: HTMLElement, x: number, y: number): void {
	el.style.left = `${x}px`;
	el.style.top = `${y}px`;
}