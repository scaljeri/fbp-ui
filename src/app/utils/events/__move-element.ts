import { IFbpEventState } from '../event-types';

const dndMoveElement = (state: IFbpEventState): void => {
	state.target.style.left = `${state.x}px`;
	state.target.style.top = `${state.y}px`;
}

export { dndMoveElement };