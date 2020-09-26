import { IFbpPosition } from '@scaljeri/fbp-core';
import { IFbpEventState } from '../event-types';

export const coordinateToPercentage = (state: IFbpEventState): IFbpPosition => {
	// To percentage
	const left = (100 * state.x) / state.parentRect.width;
	const top = (100 * state.y) / state.parentRect.height;

	// state.child.style.left = `${left}%`;
	// state.child.style.top = `${top}%`;

	return { left, top };
}