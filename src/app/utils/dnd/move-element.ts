import { IDragAndDropState } from './types';

const dndMoveElement = (state: IDragAndDropState): void => {
	state.target.style.left = `${state.x}px`;
	state.target.style.top = `${state.y}px`;
}

export { dndMoveElement };