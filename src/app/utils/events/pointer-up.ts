import { IFbpEventState, IFbpPointerEventHandlers } from '../event-types';

const pointerUp = (handlers: IFbpPointerEventHandlers, states: IFbpEventState[]): (e: PointerEvent) => void => {
	return (event: PointerEvent): void => {
		event.stopPropagation();

		if (handlers.up) {
			states.forEach(state => {
				handlers.up(event, state);
			});
		}
	};
}

export { pointerUp };